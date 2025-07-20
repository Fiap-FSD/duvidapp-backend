import { Injectable } from '@nestjs/common';
import { IDuvida } from 'src/duvida/schemas/models/duvida.interface';
import { DuvidaRepository } from '../duvida.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Duvida } from 'src/duvida/schemas/duvida.schema';
import { Model } from 'mongoose';

@Injectable()
export class DuvidaMongooseRepository implements DuvidaRepository {
  constructor(@InjectModel(Duvida.name) private duvidaModel: Model<Duvida>) {}
  
  getAllDuvida(limit: number, page: number): Promise<IDuvida[]> {
    const offset = (page - 1) * limit;

    return this.duvidaModel.find().skip(offset).limit(limit).exec();
  }
  
  getDuvidaById(duvidaId: string): Promise<IDuvida> {
    return this.duvidaModel.findById(duvidaId).exec();
  }
  
  async createDuvida(duvida: IDuvida): Promise<void> {
    const createDuvida = new this.duvidaModel(duvida);
    await createDuvida.save();
  }
  
  async updateDuvida(duvidaId: string, duvida: IDuvida): Promise<IDuvida> {
    const result = await this.duvidaModel
      .findByIdAndUpdate(duvidaId, duvida, { new: true })
      .exec();
    return result;
  }

  async deleteDuvida(duvidaId: string): Promise<void> {
    await this.duvidaModel.deleteOne({ _id: duvidaId }).exec();
  }

  async searchDuvidas(keyword: string): Promise<IDuvida[]> {
    const searchRegex = new RegExp(keyword, 'i'); // 'i' para case-insensitive
    return this.duvidaModel
      .find({
        $or: [
          { title: searchRegex },
          { content: searchRegex },
          { tags: searchRegex },
          { authorName: searchRegex },
        ],
      })
      .exec();
  }

  async searchDuvidasAdvanced(filters: {
    keyword?: string;
    author?: string;
    tags?: string[];
    isResolved?: boolean;
    sortBy?: 'recent' | 'likes' | 'views';
    limit?: number;
    page?: number;
  }): Promise<IDuvida[]> {
    const query: any = {};
    
    // Filtro por palavra-chave
    if (filters.keyword) {
      const searchRegex = new RegExp(filters.keyword, 'i');
      query.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { tags: searchRegex },
      ];
    }
    
    // Filtro por autor
    if (filters.author) {
      const authorRegex = new RegExp(filters.author, 'i');
      query.authorName = authorRegex;
    }
    
    // Filtro por tags
    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }
    
    // Filtro por status de resolução
    if (filters.isResolved !== undefined) {
      query.isResolved = filters.isResolved;
    }
    
    let queryBuilder = this.duvidaModel.find(query);
    
    // Ordenação
    switch (filters.sortBy) {
      case 'recent':
        queryBuilder = queryBuilder.sort({ createdAt: -1 });
        break;
      case 'likes':
        queryBuilder = queryBuilder.sort({ likes: -1 });
        break;
      case 'views':
        queryBuilder = queryBuilder.sort({ viewing: -1 });
        break;
      default:
        queryBuilder = queryBuilder.sort({ createdAt: -1 });
    }
    
    // Paginação
    if (filters.page && filters.limit) {
      const offset = (filters.page - 1) * filters.limit;
      queryBuilder = queryBuilder.skip(offset).limit(filters.limit);
    }
    
    return queryBuilder.exec();
  }

  async getPopularTags(limit: number = 10): Promise<string[]> {
    const pipeline: any[] = [
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
      { $project: { _id: 1 } }
    ];
    
    const result = await this.duvidaModel.aggregate(pipeline).exec();
    return result.map(item => item._id);
  }
}

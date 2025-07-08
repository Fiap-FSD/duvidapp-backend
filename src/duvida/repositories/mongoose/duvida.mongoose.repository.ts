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
    const createStock = new this.duvidaModel(duvida);

    await createStock.save();
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
        ],
      })
      .exec();
  }
}

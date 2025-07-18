import { Injectable } from '@nestjs/common';
import { IResposta } from 'src/resposta/schemas/models/resposta.interface';
import { RespostaRepository } from '../resposta.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Resposta } from 'src/resposta/schemas/resposta.schema';
import { Model } from 'mongoose';

@Injectable()
export class RespostaMongooseRepository implements RespostaRepository {
  constructor(
    @InjectModel(Resposta.name) private respostaModel: Model<Resposta>,
  ) {}
  async getAllRespostaFromDuvida(duvidaId: string): Promise<IResposta[]> {
    return this.respostaModel.find({ duvidaId: duvidaId }).lean().exec();
  }
  getRespostaById(respostaId: string): Promise<IResposta> {
    return this.respostaModel.findById(respostaId).lean().exec();
  }
  async createResposta(resposta: IResposta): Promise<void> {
    const createStock = new this.respostaModel(resposta);

    await createStock.save();
  }
  async updateResposta(
    respostaId: string,
    resposta: IResposta,
  ): Promise<IResposta> {
    const result = await this.respostaModel
      .findByIdAndUpdate(respostaId, resposta, { new: true })
      .exec();
    return result;
  }

  async deleteResposta(respostaId: string): Promise<void> {
    await this.respostaModel.deleteOne({ _id: respostaId }).exec();
  }

  async countByDuvidaId(duvidaId: string): Promise<number> {
    return this.respostaModel.countDocuments({ duvidaId });
  }

  async searchRespostas(keyword: string): Promise<IResposta[]> {
     const searchRegex = new RegExp(keyword, 'i'); // 'i' para case-insensitive
     return this.respostaModel
       .find({
         $or: [{ content: searchRegex }],
       })
       .exec();
  }
}

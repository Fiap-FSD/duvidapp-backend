import { IResposta } from 'src/resposta/schemas/models/resposta.interface';
import { RespostaRepository } from '../resposta.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Resposta } from 'src/resposta/schemas/resposta.schema';
import { Model } from 'mongoose';

export class RespostaMongooseRepository implements RespostaRepository {
  constructor(
    @InjectModel(Resposta.name) private respostaModel: Model<Resposta>,
  ) {}
  // getAllResposta(limit: number, page: number): Promise<IResposta[]> {
  //   const offset = (page - 1) * limit;

  //   return this.respostaModel.find().skip(offset).limit(limit).exec();
  // }
  getRespostaById(respostaId: string): Promise<IResposta> {
    return this.respostaModel.findById(respostaId).exec();
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

  // async searchRespostas(keyword: string): Promise<IResposta[]> {
  //   const searchRegex = new RegExp(keyword, 'i'); // 'i' para case-insensitive
  //   return this.respostaModel
  //     .find({
  //       $or: [{ title: searchRegex }, { content: searchRegex }],
  //     })
  //     .exec();
  // }
}

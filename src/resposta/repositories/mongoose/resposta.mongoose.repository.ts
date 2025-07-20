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
    const createResposta = new this.respostaModel({
      ...resposta,
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: []
    });
    await createResposta.save();
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

  async likeResposta(respostaId: string, userId: string): Promise<IResposta> {
    const result = await this.respostaModel.findByIdAndUpdate(
      respostaId,
      {
        $addToSet: { likedBy: userId },
        $pull: { dislikedBy: userId },
        $inc: { likes: 1 }
      },
      { new: true }
    ).exec();
    
    // Recalcular dislikes se o usuário estava na lista de dislikes
    const wasDisliked = await this.respostaModel.findById(respostaId).select('dislikedBy').exec();
    if (wasDisliked && wasDisliked.dislikedBy.includes(userId)) {
      await this.respostaModel.findByIdAndUpdate(
        respostaId,
        { $inc: { dislikes: -1 } }
      ).exec();
    }
    
    return result;
  }

  async dislikeResposta(respostaId: string, userId: string): Promise<IResposta> {
    const result = await this.respostaModel.findByIdAndUpdate(
      respostaId,
      {
        $addToSet: { dislikedBy: userId },
        $pull: { likedBy: userId },
        $inc: { dislikes: 1 }
      },
      { new: true }
    ).exec();
    
    // Recalcular likes se o usuário estava na lista de likes
    const wasLiked = await this.respostaModel.findById(respostaId).select('likedBy').exec();
    if (wasLiked && wasLiked.likedBy.includes(userId)) {
      await this.respostaModel.findByIdAndUpdate(
        respostaId,
        { $inc: { likes: -1 } }
      ).exec();
    }
    
    return result;
  }

  async removeLikeResposta(respostaId: string, userId: string): Promise<IResposta> {
    return this.respostaModel.findByIdAndUpdate(
      respostaId,
      {
        $pull: { likedBy: userId },
        $inc: { likes: -1 }
      },
      { new: true }
    ).exec();
  }

  async removeDislikeResposta(respostaId: string, userId: string): Promise<IResposta> {
    return this.respostaModel.findByIdAndUpdate(
      respostaId,
      {
        $pull: { dislikedBy: userId },
        $inc: { dislikes: -1 }
      },
      { new: true }
    ).exec();
  }
}

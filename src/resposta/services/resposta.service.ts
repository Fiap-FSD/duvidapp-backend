import { Injectable, NotFoundException } from '@nestjs/common';
import { RespostaRepository } from '../repositories/resposta.repository';
import { IResposta } from '../schemas/models/resposta.interface';

@Injectable()
export class RespostaService {
  constructor(private readonly respostaRepository: RespostaRepository) {}

  async getAllRespostaFromDuvida(duvidaId: string) {
    const respostas = await this.respostaRepository.getAllRespostaFromDuvida(duvidaId);
    if (!respostas || respostas.length === 0) {
      throw new NotFoundException('Nenhuma resposta encontrada para esta dúvida.');
    }
    return respostas;
  }

  async getRespostaById(respostaId: string) {
    const resposta = await this.respostaRepository.getRespostaById(respostaId);
    if (!resposta) throw new NotFoundException('Response is not found');
    return resposta;
  }

  async createResposta(resposta: IResposta) {
    return this.respostaRepository.createResposta(resposta);
  }

  async updateResposta(respostaId: string, resposta: IResposta) {
    const updatedResposta = await this.respostaRepository.updateResposta(
      respostaId,
      resposta,
    );
    if (!updatedResposta) throw new NotFoundException('Response is not found');
    return updatedResposta;
  }

  async deleteResposta(respostaId: string) {
    return this.respostaRepository.deleteResposta(respostaId);
  }

  async searchRespostas(keyword: string) {
    return this.respostaRepository.searchRespostas(keyword);
  }
}

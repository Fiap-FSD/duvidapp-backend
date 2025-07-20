import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException, Inject, forwardRef } from '@nestjs/common';
import { RespostaRepository } from '../repositories/resposta.repository';
import { DuvidaRepository } from '../../duvida/repositories/duvida.repository';
import { IResposta } from '../schemas/models/resposta.interface';

@Injectable()
export class RespostaService {
  constructor(
    private readonly respostaRepository: RespostaRepository,
    // **A CORREÇÃO ESTÁ AQUI**
    // Usamos @Inject(forwardRef(...)) para quebrar a dependência circular entre os serviços.
    @Inject(forwardRef(() => DuvidaRepository))
    private readonly duvidaRepository: DuvidaRepository,
  ) {}

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

  async createResposta(
    respostaData: { duvidaId: string, content: string }, 
    user: any
  ) {
    if (!user || !user.userId) {
        throw new UnauthorizedException('Usuário não autenticado ou token inválido.');
    }

    const respostaParaSalvar: Partial<IResposta> = {
      duvidaId: respostaData.duvidaId,
      content: respostaData.content,
      authorId: user.userId,
      authorName: user.username,
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: []
    };
    
    return this.respostaRepository.createResposta(respostaParaSalvar as IResposta);
  }

  async updateResposta(respostaId: string, updates: Partial<IResposta>) {
    const existingResposta = await this.respostaRepository.getRespostaById(respostaId);

    if (!existingResposta) {
      throw new NotFoundException('Resposta não encontrada para atualização.');
    }

    const respostaParaAtualizar = { ...existingResposta, ...updates };

    const updatedResposta = await this.respostaRepository.updateResposta(
      respostaId,
      respostaParaAtualizar,
    );
    
    if (!updatedResposta) {
      throw new NotFoundException('Falha ao atualizar a resposta após a mesclagem.');
    }
    
    return updatedResposta;
  }

  async deleteResposta(respostaId: string) {
    const deleted = await this.respostaRepository.deleteResposta(respostaId);
    if (deleted === null) {
        throw new NotFoundException('Resposta não encontrada para deletar.');
    }
    return { message: 'Resposta deletada com sucesso.' };
  }

  async searchRespostas(keyword: string) {
    return this.respostaRepository.searchRespostas(keyword);
  }

  async verifyAnswer(respostaId: string, requestingUserId: string): Promise<IResposta> {
    const resposta = await this.respostaRepository.getRespostaById(respostaId);
    if (!resposta) {
      throw new NotFoundException('Resposta não encontrada.');
    }

    const duvida = await this.duvidaRepository.getDuvidaById(resposta.duvidaId);
    if (!duvida) {
      throw new NotFoundException('A dúvida associada a esta resposta não foi encontrada.');
    }

    if (duvida.authorId !== requestingUserId) {
      throw new ForbiddenException('Apenas o autor da dúvida pode marcar uma resposta como correta.');
    }

    resposta.isVerified = true;
    
    return this.respostaRepository.updateResposta(respostaId, resposta);
  }

  async likeResposta(respostaId: string, userId: string): Promise<IResposta> {
    const resposta = await this.respostaRepository.getRespostaById(respostaId);
    if (!resposta) {
      throw new NotFoundException('Resposta não encontrada.');
    }

    // Verificar se o usuário já deu like
    if (resposta.likedBy && resposta.likedBy.includes(userId)) {
      // Remover like
      return this.respostaRepository.removeLikeResposta(respostaId, userId);
    } else {
      // Adicionar like
      return this.respostaRepository.likeResposta(respostaId, userId);
    }
  }

  async dislikeResposta(respostaId: string, userId: string): Promise<IResposta> {
    const resposta = await this.respostaRepository.getRespostaById(respostaId);
    if (!resposta) {
      throw new NotFoundException('Resposta não encontrada.');
    }

    // Verificar se o usuário já deu dislike
    if (resposta.dislikedBy && resposta.dislikedBy.includes(userId)) {
      // Remover dislike
      return this.respostaRepository.removeDislikeResposta(respostaId, userId);
    } else {
      // Adicionar dislike
      return this.respostaRepository.dislikeResposta(respostaId, userId);
    }
  }
}

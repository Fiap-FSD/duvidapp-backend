import { Injectable, NotFoundException, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { RespostaRepository } from 'src/resposta/repositories/resposta.repository';
import { DuvidaRepository } from '../repositories/duvida.repository';
import { IDuvida } from '../schemas/models/duvida.interface';

@Injectable()
export class DuvidaService {
  constructor(
    private readonly duvidaRepository: DuvidaRepository,
    // **A CORREÇÃO ESTÁ AQUI**
    // Usamos @Inject(forwardRef(...)) para quebrar a dependência circular entre os serviços.
    @Inject(forwardRef(() => RespostaRepository))
    private readonly respostaRepository: RespostaRepository,
  ) {}

  async getAllDuvida(limit: number, page: number) {
    return this.duvidaRepository.getAllDuvida(limit, page);
  }

  async getDuvidaById(duvidaId: string) {
    const duvida = await this.duvidaRepository.getDuvidaById(duvidaId);
    if (!duvida) throw new NotFoundException('Duvida is not found');
    
    // Esta chamada agora funcionará sem causar um erro de dependência
    const respostaCount =
      await this.respostaRepository.countByDuvidaId(duvidaId);

    return {
      ...duvida,
      respostaCount,
    };
  }

  async createDuvida(
    duvidaData: { title: string; content: string; tags: string[] },
    user: any,
  ) {
    if (!user || !user.userId) {
      throw new UnauthorizedException('Informações de usuário inválidas ou não encontradas no token.');
    }

    const duvidaParaSalvar: IDuvida = {
      title: duvidaData.title,
      content: duvidaData.content,
      tags: duvidaData.tags,
      authorId: user.userId,
      authorName: user.username,
      viewing: 0,
      likes: 0,
      isResolved: false,
    };

    return this.duvidaRepository.createDuvida(duvidaParaSalvar);
  }

  async updateDuvida(duvidaId: string, updates: Partial<IDuvida>) {
    const existingDuvida = await this.duvidaRepository.getDuvidaById(duvidaId);
    if (!existingDuvida) {
      throw new NotFoundException('Dúvida não encontrada para atualização.');
    }
    const duvidaParaAtualizar = { ...existingDuvida, ...updates };
    const updatedDuvida = await this.duvidaRepository.updateDuvida(
      duvidaId,
      duvidaParaAtualizar,
    );
    if (!updatedDuvida) throw new NotFoundException('Duvida not found');
    return updatedDuvida;
  }

  async deleteDuvida(duvidaId: string) {
    return this.duvidaRepository.deleteDuvida(duvidaId);
  }

  async searchDuvidas(keyword: string) {
    return this.duvidaRepository.searchDuvidas(keyword);
  }

  async searchDuvidasAdvanced(filters: {
    keyword?: string;
    author?: string;
    tags?: string[];
    isResolved?: boolean;
    sortBy?: 'recent' | 'likes' | 'views';
    limit?: number;
    page?: number;
  }) {
    return this.duvidaRepository.searchDuvidasAdvanced(filters);
  }

  async getPopularTags(limit: number = 10) {
    return this.duvidaRepository.getPopularTags(limit);
  }
}

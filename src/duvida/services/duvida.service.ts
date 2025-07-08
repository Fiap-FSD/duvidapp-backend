import { Injectable, NotFoundException } from '@nestjs/common';
import { RespostaRepository } from 'src/resposta/repositories/resposta.repository';
import { DuvidaRepository } from '../repositories/duvida.repository';
import { IDuvida } from '../schemas/models/duvida.interface';

@Injectable()
export class DuvidaService {
  constructor(
    private readonly duvidaRepository: DuvidaRepository,
    private readonly respostaRepository: RespostaRepository,
  ) {}

  async getAllDuvida(limit: number, page: number) {
    return this.duvidaRepository.getAllDuvida(limit, page);
  }

  async getDuvidaById(duvidaId: string) {
    const duvida = await this.duvidaRepository.getDuvidaById(duvidaId);
    if (!duvida) throw new NotFoundException('Duvida is not found');
    const respostaCount =
      await this.respostaRepository.countByDuvidaId(duvidaId);

    return {
      ...duvida,
      respostaCount,
    };
  }

  async createDuvida(duvida: IDuvida) {
    return this.duvidaRepository.createDuvida({
      ...duvida,
      viewing: duvida.viewing ?? 0,
      likes: duvida.likes ?? 0,
    });
  }

  async updateDuvida(duvidaId: string, duvida: IDuvida) {
    const updatedDuvida = await this.duvidaRepository.updateDuvida(
      duvidaId,
      duvida,
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
}

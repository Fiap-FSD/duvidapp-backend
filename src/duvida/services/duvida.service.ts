import { Injectable, NotFoundException } from '@nestjs/common';
import { DuvidaRepository } from '../repositories/duvida.repository';
import { IDuvida } from '../schemas/models/duvida.interface';

@Injectable()
export class DuvidaService {
  constructor(private readonly duvidaRepository: DuvidaRepository) {}

  async getAllDuvida(limit: number, page: number) {
    return this.duvidaRepository.getAllDuvida(limit, page);
  }

  async getDuvidaById(duvidaId: string) {
    const duvida = await this.duvidaRepository.getDuvidaById(duvidaId);
    if (!duvida) throw new NotFoundException('Duvida is not found');
    return duvida;
  }

  async createDuvida(duvida: IDuvida) {
    return this.duvidaRepository.createDuvida(duvida);
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

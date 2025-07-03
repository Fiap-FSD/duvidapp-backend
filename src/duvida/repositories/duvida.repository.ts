import { IDuvida } from '../schemas/models/duvida.interface';

export abstract class DuvidaRepository {
  abstract getAllDuvida(limit: number, page: number): Promise<IDuvida[]>;
  abstract getDuvidaById(duvidaId: string): Promise<IDuvida>;
  abstract createDuvida(duvida: IDuvida): Promise<void>;
  abstract updateDuvida(duvidaId: string, duvida: IDuvida): Promise<IDuvida>;
  abstract deleteDuvida(duvidaId: string): Promise<void>;
  abstract searchDuvidas(keyword: string): Promise<IDuvida[]>;
}

import { IResposta } from '../schemas/models/resposta.interface';

export abstract class RespostaRepository {
  // abstract getAllResposta(limit: number, page: number): Promise<IResposta[]>;
  abstract getRespostaById(respostaId: string): Promise<IResposta>;
  abstract createResposta(resposta: IResposta): Promise<void>;
  abstract updateResposta(
    respostaId: string,
    resposta: IResposta,
  ): Promise<IResposta>;
  abstract deleteResposta(respostaId: string): Promise<void>;
  // abstract searchRespostas(keyword: string): Promise<IResposta[]>;
}

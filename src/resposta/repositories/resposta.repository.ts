import { IResposta } from '../schemas/models/resposta.interface';

export abstract class RespostaRepository {
  abstract getAllRespostaFromDuvida(duvidaId: string): Promise<IResposta[]>;
  abstract getRespostaById(respostaId: string): Promise<IResposta>;
  abstract createResposta(resposta: IResposta): Promise<void>;
  abstract updateResposta(
    respostaId: string,
    resposta: IResposta,
  ): Promise<IResposta>;
  abstract deleteResposta(respostaId: string): Promise<void>;
  abstract countByDuvidaId(duvidaId: string): Promise<number>;
  abstract searchRespostas(keyword: string): Promise<IResposta[]>;
  abstract likeResposta(respostaId: string, userId: string): Promise<IResposta>;
  abstract dislikeResposta(respostaId: string, userId: string): Promise<IResposta>;
  abstract removeLikeResposta(respostaId: string, userId: string): Promise<IResposta>;
  abstract removeDislikeResposta(respostaId: string, userId: string): Promise<IResposta>;
}

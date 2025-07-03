export interface IResposta {
  id?: string;
  duvidaId?: string; // ID da dúvida associada a resposta
  // authorId: string; // ID do autor (aluno ou professor)
  author: string;
  content: string;
  isVerified: boolean;
  votes: number; // se quisermos guardar quem votou, usa-se string[]
}

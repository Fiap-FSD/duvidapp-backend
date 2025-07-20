export interface IResposta {
  id?: string;
  duvidaId: string;
  authorId: string;
  authorName: string; // Este campo é obrigatório
  content: string;
  isVerified: boolean;
  votes: number;
  likes: number;
  dislikes: number;
  likedBy: string[]; // Array de IDs dos usuários que deram like
  dislikedBy: string[]; // Array de IDs dos usuários que deram dislike
}

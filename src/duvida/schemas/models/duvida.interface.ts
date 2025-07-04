export interface IDuvida {
  id?: string;
  title: string;
  // author: string;
  authorId?: string; // ID do autor (aluno ou professor)
  content: string;
  tags?: string[];
  viewing: number;
  likes: number;
}

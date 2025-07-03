export interface IDuvida {
  id?: string;
  title: string;
  author: string;
  // authorId: string; // ID do autor (aluno ou professor)
  intro: string;
  content: string;
  tags?: string;
  // tags?: string[];
  imageUrl?: string;
}

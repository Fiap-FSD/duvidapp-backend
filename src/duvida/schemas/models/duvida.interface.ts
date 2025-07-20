export interface IDuvida {
  id?: string; // Opcional, pois é gerado pelo banco
  title: string;
  content: string;
  tags: string[];
  authorId: string;   // Obrigatório
  authorName: string; // Obrigatório
  viewing: number;
  likes: number;
  isResolved: boolean;
  createdAt?: Date; // Opcional, gerado pelo Mongoose
  updatedAt?: Date; // Opcional, gerado pelo Mongoose
}

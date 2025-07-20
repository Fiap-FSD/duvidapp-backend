import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IResposta } from './models/resposta.interface';

@Schema({ timestamps: true })
export class Resposta extends Document implements IResposta {
  @Prop({ required: true })
  duvidaId: string;

  @Prop({ required: true })
  authorId: string;

  // **PROPRIEDADE ADICIONADA**
  // Adicionamos o authorName aqui para corresponder à interface.
  @Prop({ required: true })
  authorName: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: 0 })
  votes: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  dislikes: number;

  @Prop({ type: [String], default: [] })
  likedBy: string[];

  @Prop({ type: [String], default: [] })
  dislikedBy: string[];
}

export const RespostaSchema = SchemaFactory.createForClass(Resposta);

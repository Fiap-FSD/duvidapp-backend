import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IResposta } from './models/resposta.interface';
import mongoose, { HydratedDocument } from 'mongoose';

export type RespostaDocument = HydratedDocument<Resposta>;

@Schema({ timestamps: true })
export class Resposta implements IResposta {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Duvida' })
  duvidaId?: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId?: string;
  // @Prop()
  // author: string;
  @Prop()
  content: string;
  @Prop({ default: false })
  isVerified: boolean;
  @Prop({ default: 0 })
  votes: number;
}

export const RespostaSchema = SchemaFactory.createForClass(Resposta);

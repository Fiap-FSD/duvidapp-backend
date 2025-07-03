import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IDuvida } from './models/duvida.interface';
import mongoose, { HydratedDocument } from 'mongoose';

export type DuvidaDocument = HydratedDocument<Duvida>;

@Schema({ timestamps: true })
export class Duvida implements IDuvida {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string;
  @Prop()
  title: string;
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // authorId: string;
  @Prop()
  author: string;
  @Prop()
  intro: string;
  @Prop()
  content: string;
  @Prop()
  tags?: string; // tags?: string[];
  @Prop()
  imageUrl?: string;
}

export const DuvidaSchema = SchemaFactory.createForClass(Duvida);

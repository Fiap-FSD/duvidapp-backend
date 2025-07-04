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
  // @Prop()
  // author: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: string;
  @Prop()
  content: string;
  @Prop({ type: [String], default: [] })
  tags?: string[];
  @Prop({ default: 0 })
  viewing: number;
  @Prop({ default: 0 })
  likes: number;
}

export const DuvidaSchema = SchemaFactory.createForClass(Duvida);

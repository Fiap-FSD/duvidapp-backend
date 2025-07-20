import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IDuvida } from './models/duvida.interface';

@Schema({ timestamps: true })
export class Duvida extends Document implements IDuvida {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop([String])
  tags: string[];

  // **CAMPOS ADICIONADOS**
  // Adicionamos os campos do autor para que o Mongoose saiba como salvá-los.
  @Prop({ required: true })
  authorId: string;

  @Prop({ required: true })
  authorName: string;

  @Prop({ default: 0 })
  viewing: number;

  @Prop({ default: 0 })
  likes: number;
  
  // Adicione outros campos se necessário, como isResolved
  @Prop({ default: false })
  isResolved: boolean;
}

export const DuvidaSchema = SchemaFactory.createForClass(Duvida);

/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class UpdateDuvidaDto {
  @ApiProperty({
    example: '67886b8d920149a1874cf70',
    description: 'ID único da dúvida a ser atualizada.',
  })
  id: string;

  @ApiProperty({
    example: 'Minha dúvida atualizada.',
    description: 'Título atualizado da dúvida.',
    required: false,
  })
  title?: string;

  @ApiProperty({
    example: 'Aqui está o conteúdo atualizado.',
    description: 'Conteúdo atualizado da dúvida.',
    required: false,
  })
  content?: string;

  @ApiProperty({
    example: ['javascript', 'react'],
    description: 'Novas tags.',
    required: false,
    isArray: true,
    type: String,
  })
  tags?: string[];

  @ApiProperty({
    example: 3,
    description: 'Atualização no número de visualizações.',
    required: false,
  })
  viewing?: number;

  @ApiProperty({
    example: 62,
    description: 'Atualização no número de likes.',
    required: false,
  })
  likes?: number;
}

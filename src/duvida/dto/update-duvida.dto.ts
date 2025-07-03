/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class UpdateDuvidaDto {
  @ApiProperty({
    example: '67886b8d920149a1874cf70',
    description: 'ID único da dúvida a ser atualizada.',
  })
  id: string;

  @ApiProperty({
    example: 'Minha primeira dúvida atualizado',
    description: 'Título atualizado da dúvida.',
    required: false,
  })
  title?: string;

  @ApiProperty({
    example: 'Uma introdução breve atualizada.',
    description: 'Introdução atualizada da dúvida.',
    required: false,
  })
  intro?: string;

  @ApiProperty({
    example: 'Aqui está o conteúdo atualizado.',
    description: 'Conteúdo atualizado da dúvida.',
    required: false,
  })
  content?: string;

  @ApiProperty({
    example: '#fisica #eletromagnetismo',
    description: 'tags atualizadas de uma dúvida.',
    required: false,
  })
  tags?: string;

  @ApiProperty({
    example: 'https://meusite.com/imagem-nova.png',
    description: 'URL atualizada de uma imagem.',
    required: false,
  })
  imageUrl?: string;
}

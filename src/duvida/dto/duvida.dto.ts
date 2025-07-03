/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class DuvidaDto {
  @ApiProperty({
    example: 'Minha primeira dúvida',
    description: 'Título da dúvida.',
  })
  title: string;

  @ApiProperty({
    example: 'Uma introdução breve sobre o conteúdo.',
    description: 'Uma introdução da dúvida.',
  })
  intro: string;

  @ApiProperty({
    example: 'Aqui está o conteúdo detalhado do meu post.',
    description: 'O conteúdo completo da dúvida.',
  })
  content: string;

  @ApiProperty({
    example: 'https://meusite.com/imagem.png',
    description: 'URL de uma imagem relacionada.',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    example: '#matematica #funcao #derivada',
    description: 'tags da duvida relacionada.',
    required: false,
  })
  tags?: string;
}

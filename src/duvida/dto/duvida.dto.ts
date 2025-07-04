/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class DuvidaDto {

  @ApiProperty({
    example: '64ab123456ef7890123456aa',
    description: 'ID do autor da dúvida.',
  })
  authorId: string;

  @ApiProperty({
    example: 'Minha primeira dúvida',
    description: 'Título da dúvida.',
  })
  title: string;

  @ApiProperty({
    example: 'Aqui está o conteúdo detalhado da minha dúvida.',
    description: 'O conteúdo da dúvida.',
  })
  content: string;

  @ApiProperty({
    example: ['matematica', 'funcao', 'derivada'],
    description: 'Tags associadas à dúvida.',
    required: false,
    isArray: true,
    type: String,
  })
  tags?: string[];

  @ApiProperty({
    example: 5,
    description: 'Número de visualizações.',
    required: false,    
  })
  viewing?: number;

  @ApiProperty({
    example: 42,
    description: 'Quantidade de curtidas.',
    required: false,
  })
  likes?: number;
}

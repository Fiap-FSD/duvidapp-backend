/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRespostaDto {
  @ApiProperty({
    example: '67886b8d920149a1874cf70',
    description: 'ID único da resposta a ser atualizada.',
  })
  id: string;

  @ApiProperty({
    example: '67886b8d965449a1874de70',
    description: 'ID único da dúvida em que a resposta pertence.'
  })
  duvidaId: string;

  @ApiProperty({
    example: 'Aqui está o conteúdo atualizado.',
    description: 'Conteúdo atualizado da resposta.',
    required: false,
  })
  content?: string;

  @ApiProperty({
    example: true,
    description: 'Verificação atualizada da resposta.',
    required: false,
  })
  isVerified?: boolean;

  @ApiProperty({
    example: 700,
    description: 'Números atualizados de votos.',
    required: false,
  })
  votes?: number;
}

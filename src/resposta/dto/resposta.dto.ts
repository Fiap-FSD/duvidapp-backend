/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class RespostaDto {
  @ApiProperty({
    example: '64ab123456ef7890123456aa',
    description: 'ID da dúvida à qual esta resposta pertence.', 
  })
  duvidaId: string; 
  
  @ApiProperty({
    example: 'Minha primeira resposta',
    description: 'Título da resposta.',
  })
  title: string;

  @ApiProperty({
    example: 'Aqui está o conteúdo detalhado do meu post.',
    description: 'O conteúdo completo da resposta.',
  })
  content: string;

  @ApiProperty({
    example: false,
    description: 'Verificação da resposta.',
    required: false,
  })
  isVerified?: boolean;

  @ApiProperty({
    example: 5,
    description: 'Números de votos.',
  })
  votes: number;
}

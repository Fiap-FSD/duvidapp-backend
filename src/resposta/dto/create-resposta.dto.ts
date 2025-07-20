/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateRespostaDto {
  @ApiProperty({
    example: '64ab123456ef7890123456aa',
    description: 'ID da dúvida à qual esta resposta pertence.',
  })
  @IsString()
  @IsNotEmpty()
  duvidaId: string;

  @ApiProperty({
    example: 'Aqui está o conteúdo detalhado da minha resposta.',
    description: 'O conteúdo completo da resposta.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'O conteúdo deve ter pelo menos 10 caracteres.' })
  content: string;
}


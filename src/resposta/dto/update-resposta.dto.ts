/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber, IsOptional, MinLength } from 'class-validator';

export class UpdateRespostaDto {
  @ApiProperty({
    example: 'Aqui está o conteúdo atualizado.',
    description: 'Conteúdo atualizado da resposta.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'O conteúdo deve ter pelo menos 10 caracteres.' })
  content?: string;

  @ApiProperty({
    example: true,
    description: 'Verificação atualizada da resposta.',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @ApiProperty({
    example: 700,
    description: 'Números atualizados de votos.',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  votes?: number;
}

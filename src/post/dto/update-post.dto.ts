import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ example: '67886b8d920149a1874cf70', description: 'ID único da postagem a ser atualizada.' })
  id: string;

  @ApiProperty({ example: 'Meu primeiro post atualizado', description: 'Título atualizado da postagem.', required: false })
  title?: string;

  @ApiProperty({ example: 'Uma introdução breve atualizada.', description: 'Introdução atualizada da postagem.', required: false })
  intro?: string;

  @ApiProperty({ example: 'Aqui está o conteúdo atualizado.', description: 'Conteúdo atualizado da postagem.', required: false })
  content?: string;

  @ApiProperty({ example: 'https://meusite.com/imagem-nova.png', description: 'URL atualizada de uma imagem.', required: false })
  imageUrl?: string;

  @ApiProperty({ example: 'https://meusite.com/video-novo.mp4', description: 'URL atualizada de um vídeo.', required: false })
  videoUrl?: string;
}

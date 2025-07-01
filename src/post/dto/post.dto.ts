import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({ example: 'Meu primeiro post', description: 'Título da postagem.' })
  title: string;

  @ApiProperty({ example: 'Uma introdução breve sobre o conteúdo.', description: 'Uma introdução da postagem.' })
  intro: string;

  @ApiProperty({ example: 'Aqui está o conteúdo detalhado do meu post.', description: 'O conteúdo completo da postagem.' })
  content: string;

  @ApiProperty({ example: 'https://meusite.com/imagem.png', description: 'URL de uma imagem relacionada.', required: false })
  imageUrl?: string;

  @ApiProperty({ example: 'https://meusite.com/video.mp4', description: 'URL de um vídeo relacionado.', required: false })
  videoUrl?: string;
}
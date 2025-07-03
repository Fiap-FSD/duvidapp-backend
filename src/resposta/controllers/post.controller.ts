import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { PostService } from "../services/post.service";
import { z } from "zod";
import { ZodValidationPipe } from "../../shared/pipe/zod-validation.pipe";
import { LoggingInterceptor } from "../../shared/interceptors/logging.interceptor";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { PostDto } from '../dto/post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';


const createPostSchema = z.object({
    title: z.string(),
    author: z.string(),
    intro: z.string(),
    content: z.string(),
    imageUrl: z.string().optional(),
    videoUrl: z.string().optional(),
});

type CreatePost = z.infer<typeof createPostSchema>;

@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard)
@Controller('post')
export class PostController{
    constructor(
        private readonly postService: PostService
    ){}

    @Get('search')
    @ApiQuery({
        name: 'keyword',
        description: 'Palavra-chave usada para buscar posts pelo título ou conteúdo.',
        required: true,
        example: 'Postagem'
    })
    @ApiResponse({
        status: 200,
        description: 'A postagem foi encontrada com sucesso.',
        type: PostDto
    })
    @ApiResponse({
        status: 400,
        description: 'O ID fornecido é inválido ou está vazio.',
        schema: {
            example: {
                statusCode: 400,
                message: 'Keyword must be provided.',
                error: 'Bad Request',
            },
        },
    })
    async searchPosts(@Query('keyword') keyword: string) {
        if (!keyword || keyword.trim() === '') {
            throw new BadRequestException('Keyword must be provided');
        }
        return this.postService.searchPosts(keyword);
    }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'postagens retornadas.',
    })
    async getAllPost(
        @Query('limit')limit: number, 
        @Query('page')page: number) {
        return this.postService.getAllPost(limit, page);
    }

    @Get(':postId')
    @ApiQuery({
        name: 'postId',
        description: 'ID de uma postagem.',
        required: true,
        example: '67886b8d920149a1874cf70'
    })
    @ApiResponse({
        status: 200,
        description: 'A postagem foi encontrada com sucesso.',
        type: PostDto
    })
    async getPostById(@Param('postId' )postId: string) {
        return this.postService.getPostById(postId);
    }

    @ApiBearerAuth()
    @UsePipes(new ZodValidationPipe(createPostSchema))
    @Post()
    @ApiBody({
        description: 'Dados para criar um novo post.',
        type: PostDto,
      })
    @ApiResponse({
        status: 201,
        description: 'A postagem foi criada com sucesso.',
    })
    async createPost(@Body() {title, author, content, intro, imageUrl, videoUrl}) {
        return this.postService.createPost({title, author,content, intro, imageUrl, videoUrl});
    }
    
    @ApiBearerAuth()
    @Put(':postId')
    @ApiBody({
        description: 'Postagem de exemplo para ser editado.',
        type: UpdatePostDto,
    })
    @ApiResponse({
        status: 200,
        description: 'A postagem foi editada com sucesso.'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request.'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    async updatePost(
        @Param('postId') postId: string,
        @Body() {title, author, content, intro, imageUrl, videoUrl}: CreatePost,
    ) {
        return this.postService.updatePost(postId, {title, author, content, intro, imageUrl, videoUrl});
    }

    @ApiBearerAuth()
    @Delete(':postId')
    @ApiResponse({
        status: 200,
        description: 'A postagem foi deletada com sucesso.'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    async deletePost(@Param('postId') postId: string) {
        return this.postService.deletePost(postId);
    }

}
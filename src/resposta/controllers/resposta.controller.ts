/* eslint-disable prettier/prettier */
import {
  // BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { RespostaService } from '../services/resposta.service';
import { z } from 'zod';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { RespostaDto } from '../dto/resposta.dto';
import { UpdateRespostaDto } from '../dto/update-resposta.dto';

const createRespostaSchema = z.object({
  author: z.string(),
  content: z.string(),
  isVerified: z.boolean().default(false),
  votes: z.number().default(0),
});

type CreateResposta = z.infer<typeof createRespostaSchema>;

@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard)
@Controller('resposta')
export class RespostaController {
  constructor(private readonly respostaService: RespostaService) {}

  // @Get()
  // @ApiResponse({
  //   status: 200,
  //   description: 'respostas retornadas.',
  // })
  // async getAllPost(@Query('limit') limit: number, @Query('page') page: number) {
  //   return this.respostaService.getAllPost(limit, page);
  // }

  @Get(':respostaId')
  @ApiQuery({
    name: 'respostaId',
    description: 'ID de uma resposta.',
    required: true,
    example: '67886b8d920149a1874cf70',
  })
  @ApiResponse({
    status: 200,
    description: 'A resposta foi encontrada com sucesso.',
    type: RespostaDto,
  })
  async getRespostaById(@Param('respostaId') respostaId: string) {
    return this.respostaService.getRespostaById(respostaId);
  }

  @ApiBearerAuth()
  @UsePipes(new ZodValidationPipe(createRespostaSchema))
  @Post()
  @ApiBody({
    description: 'Dados para criar uma nova resposta.',
    type: RespostaDto,
  })
  @ApiResponse({
    status: 201,
    description: 'A resposta foi criada com sucesso.',
  })
  async createResposta(
    @Body() { author, content, isVerified, votes },
  ) {
    return this.respostaService.createResposta({      
      author,
      content,
      isVerified,
      votes,
    });
  }

  @ApiBearerAuth()
  @Put(':respostaId')
  @ApiBody({
    description: 'Resposta de exemplo para ser editada.',
    type: UpdateRespostaDto,
  })
  @ApiResponse({
    status: 200,
    description: 'A resposta foi editada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async updateResposta(
    @Param('respostaId') respostaId: string,
    @Body() { author, content, isVerified, votes }: CreateResposta,
  ) {
    return this.respostaService.updateResposta(respostaId, {
      author,
      content,
      isVerified,
      votes,
    });
  }

  @ApiBearerAuth()
  @Delete(':respostaId')
  @ApiResponse({
    status: 200,
    description: 'A resposta foi deletada com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async deleteResposta(@Param('respostaId') respostaId: string) {
    return this.respostaService.deleteResposta(respostaId);
  }
  
  // @Get('search')
  // @ApiQuery({
  //   name: 'keyword',
  //   description:
  //     'Palavra-chave usada para buscar respostas pelo conteúdo.',
  //   required: true,
  //   example: 'Resposta',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'A resposta foi encontrada com sucesso.',
  //   type: RespostaDto,
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'O ID fornecido é inválido ou está vazio.',
  //   schema: {
  //     example: {
  //       statusCode: 400,
  //       message: 'Keyword must be provided.',
  //       error: 'Bad Request',
  //     },
  //   },
  // })
  // async searchRespostas(@Query('keyword') keyword: string) {
  //   if (!keyword || keyword.trim() === '') {
  //     throw new BadRequestException('Keyword must be provided');
  //   }
  //   return this.respostaService.searchRespostas(keyword);
  // }
}

/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { DuvidaService } from '../services/duvida.service';
import { z } from 'zod';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { DuvidaDto } from '../dto/duvida.dto';
import { UpdateDuvidaDto } from '../dto/update-duvida.dto';

const createDuvidaSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).optional(),
  viewing: z.number().optional(),
  likes: z.number().optional(),
});

type CreateDuvida = z.infer<typeof createDuvidaSchema>;

@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard)
@Controller('duvida')
export class DuvidaController {
  constructor(private readonly duvidaService: DuvidaService) {}

  @Get('search')
  @ApiQuery({
    name: 'keyword',
    description:
      'Palavra-chave usada para buscar dúvidas pelo título ou conteúdo.',
    required: true,
    example: 'Dúvida',
  })
  @ApiResponse({
    status: 200,
    description: 'A dúvida foi encontrada com sucesso.',
    type: DuvidaDto,
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
  async searchDuvidas(@Query('keyword') keyword: string) {
    if (!keyword || keyword.trim() === '') {
      throw new BadRequestException('Keyword must be provided');
    }
    return this.duvidaService.searchDuvidas(keyword);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'dúvidas retornadas.',
  })
  async getAllDuvida(@Query('limit') limit: number, @Query('page') page: number) {
    return this.duvidaService.getAllDuvida(limit, page);
  }

  @Get(':duvidaId')
  @ApiQuery({
    name: 'duvidaId',
    description: 'ID de uma dúvida.',
    required: true,
    example: '67886b8d920149a1874cf70',
  })
  @ApiResponse({
    status: 200,
    description: 'A dúvida foi encontrada com sucesso.',
    type: DuvidaDto,
  })
  async getDuvidaById(@Param('duvidaId') duvidaId: string) {
    return this.duvidaService.getDuvidaById(duvidaId);
  }

  @ApiBearerAuth()
  @UsePipes(new ZodValidationPipe(createDuvidaSchema))
  @Post()
  @ApiBody({
    description: 'Dados para criar uma nova dúvida.',
    type: DuvidaDto,
  })
  @ApiResponse({
    status: 201,
    description: 'A dúvida foi criada com sucesso.',
  })
  async createDuvida(
    @Body() { title, content, tags, viewing, likes }: CreateDuvida,
  ) {
    return this.duvidaService.createDuvida({
      title,
      content,
      tags,
      viewing,
      likes,
    });
  }

  @ApiBearerAuth()
  @Put(':duvidaId')
  @ApiBody({
    description: 'Dúvida de exemplo para ser editado.',
    type: UpdateDuvidaDto,
  })
  @ApiResponse({
    status: 200,
    description: 'A dúvida foi editada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async updateDuvida(
    @Param('duvidaId') duvidaId: string,
    @Body() {  title, content, tags, viewing, likes }: CreateDuvida,
  ) {
    return this.duvidaService.updateDuvida(duvidaId, {
      title,
      content,
      tags,
      viewing,
      likes,
    });
  }

  @ApiBearerAuth()
  @Delete(':duvidaId')
  @ApiResponse({
    status: 200,
    description: 'A dúvida foi deletada com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async deleteDuvida(@Param('duvidaId') duvidaId: string) {
    return this.duvidaService.deleteDuvida(duvidaId);
  }
}

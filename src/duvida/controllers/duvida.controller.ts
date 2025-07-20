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
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { DuvidaService } from '../services/duvida.service';
import { z } from 'zod';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { DuvidaDto } from '../dto/duvida.dto';
import { UpdateDuvidaDto } from '../dto/update-duvida.dto';

const createDuvidaSchema = z.object({
  title: z.string().min(5, { message: 'O título deve ter no mínimo 5 caracteres.' }),
  content: z.string().min(10, { message: 'O conteúdo deve ter no mínimo 10 caracteres.' }),
  tags: z.array(z.string()),
});

type CreateDuvidaBody = z.infer<typeof createDuvidaSchema>;

@ApiTags('Dúvidas')
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard)
@Controller('duvida')
export class DuvidaController {
  constructor(private readonly duvidaService: DuvidaService) {}

  // GET - Busca simples por palavra-chave
  @Get('search')
  @ApiOperation({ summary: 'Buscar dúvidas por palavra-chave' })
  @ApiQuery({ name: 'keyword', description: 'Palavra-chave para busca' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.' })
  async searchDuvidas(@Query('keyword') keyword: string) {
    if (!keyword || keyword.trim() === '') {
      throw new BadRequestException('Keyword must be provided');
    }
    return this.duvidaService.searchDuvidas(keyword);
  }

  // GET - Busca avançada com filtros
  @Get('search/advanced')
  @ApiOperation({ summary: 'Busca avançada de dúvidas com filtros' })
  @ApiQuery({ name: 'keyword', required: false, description: 'Palavra-chave para busca' })
  @ApiQuery({ name: 'author', required: false, description: 'Nome do autor' })
  @ApiQuery({ name: 'tags', required: false, description: 'Tags separadas por vírgula' })
  @ApiQuery({ name: 'isResolved', required: false, description: 'Status de resolução (true/false)' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['recent', 'likes', 'views'], description: 'Ordenação' })
  @ApiQuery({ name: 'limit', required: false, description: 'Limite de resultados' })
  @ApiQuery({ name: 'page', required: false, description: 'Página' })
  @ApiResponse({ status: 200, description: 'Busca avançada realizada com sucesso.' })
  async searchDuvidasAdvanced(
    @Query('keyword') keyword?: string,
    @Query('author') author?: string,
    @Query('tags') tags?: string,
    @Query('isResolved') isResolved?: string,
    @Query('sortBy') sortBy?: 'recent' | 'likes' | 'views',
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ) {
    const filters: any = {};
    
    if (keyword) filters.keyword = keyword;
    if (author) filters.author = author;
    if (tags) filters.tags = tags.split(',').map(tag => tag.trim());
    if (isResolved !== undefined) filters.isResolved = isResolved === 'true';
    if (sortBy) filters.sortBy = sortBy;
    if (limit) filters.limit = parseInt(limit);
    if (page) filters.page = parseInt(page);
    
    return this.duvidaService.searchDuvidasAdvanced(filters);
  }

  // GET - Tags populares
  @Get('tags/popular')
  @ApiOperation({ summary: 'Obter tags mais populares' })
  @ApiQuery({ name: 'limit', required: false, description: 'Limite de tags retornadas' })
  @ApiResponse({ status: 200, description: 'Tags populares obtidas com sucesso.' })
  async getPopularTags(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit) : 10;
    return this.duvidaService.getPopularTags(limitNum);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todas as dúvidas' })
  @ApiQuery({ name: 'limit', description: 'Limite de resultados' })
  @ApiQuery({ name: 'page', description: 'Página' })
  @ApiResponse({ status: 200, description: 'Dúvidas obtidas com sucesso.' })
  async getAllDuvida(@Query('limit') limit: number, @Query('page') page: number) {
    return this.duvidaService.getAllDuvida(limit, page);
  }

  @Get(':duvidaId')
  @ApiOperation({ summary: 'Obter dúvida por ID' })
  @ApiResponse({ status: 200, description: 'Dúvida encontrada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Dúvida não encontrada.' })
  async getDuvidaById(@Param('duvidaId') duvidaId: string) {
    return this.duvidaService.getDuvidaById(duvidaId);
  }

  @ApiBearerAuth()
  @UsePipes(new ZodValidationPipe(createDuvidaSchema))
  @Post()
  @ApiOperation({ summary: 'Criar nova dúvida' })
  @ApiBody({
    description: 'Dados para criar uma nova dúvida.',
    type: DuvidaDto,
  })
  @ApiResponse({
    status: 201,
    description: 'A dúvida foi criada com sucesso.',
  })
  async createDuvida(
    @Request() req,
    @Body() body: CreateDuvidaBody,
  ) {
    const user = req.user;

    if (!user || !user.userId) {
      throw new UnauthorizedException('Informações de usuário inválidas ou não encontradas no token.');
    }

    const duvidaData = {
      title: body.title,
      content: body.content,
      tags: body.tags,
    };
    
    return this.duvidaService.createDuvida(duvidaData, user);
  }

  @ApiBearerAuth()
  @Put(':duvidaId')
  @ApiOperation({ summary: 'Atualizar dúvida' })
  @ApiResponse({ status: 200, description: 'Dúvida atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Dúvida não encontrada.' })
  async updateDuvida(
    @Param('duvidaId') duvidaId: string,
    @Body() updateDto: UpdateDuvidaDto,
  ) {
    return this.duvidaService.updateDuvida(duvidaId, updateDto);
  }

  @ApiBearerAuth()
  @Delete(':duvidaId')
  @ApiOperation({ summary: 'Deletar dúvida' })
  @ApiResponse({ status: 200, description: 'Dúvida deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Dúvida não encontrada.' })
  async deleteDuvida(@Param('duvidaId') duvidaId: string) {
    return this.duvidaService.deleteDuvida(duvidaId);
  }
}

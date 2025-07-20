/* eslint-disable prettier/prettier */
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  Patch,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RespostaService } from '../services/resposta.service';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateRespostaDto } from '../dto/create-resposta.dto';
import { UpdateRespostaDto } from '../dto/update-resposta.dto';

@ApiTags('Respostas')
@Controller('resposta')
export class RespostaController {
  constructor(private readonly respostaService: RespostaService) {}

  // GET - Buscar todas as respostas de uma dúvida
  @Get(':duvidaId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obter todas as respostas de uma dúvida' })
  @ApiResponse({ status: 200, description: 'Respostas encontradas com sucesso.' })
  @ApiResponse({ status: 404, description: 'Nenhuma resposta encontrada para esta dúvida.' })
  async getAllRespostaFromDuvida(@Param('duvidaId') duvidaId: string) {
    return this.respostaService.getAllRespostaFromDuvida(duvidaId);
  }

  // GET - Buscar resposta por ID
  @Get('single/:respostaId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obter uma resposta específica por ID' })
  @ApiResponse({ status: 200, description: 'Resposta encontrada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Resposta não encontrada.' })
  async getRespostaById(@Param('respostaId') respostaId: string) {
    return this.respostaService.getRespostaById(respostaId);
  }

  // POST - Criar nova resposta
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar uma nova resposta' })
  @ApiResponse({ status: 201, description: 'Resposta criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 401, description: 'Usuário não autenticado.' })
  async createResposta(
    @Body() createRespostaDto: CreateRespostaDto,
    @Request() req,
  ) {
    return this.respostaService.createResposta(createRespostaDto, req.user);
  }

  // PUT - Atualizar resposta
  @Put(':respostaId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Atualizar uma resposta (apenas Admin)' })
  @ApiResponse({ status: 200, description: 'Resposta atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Resposta não encontrada.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async updateResposta(
    @Param('respostaId') respostaId: string,
    @Body() updateRespostaDto: UpdateRespostaDto,
  ) {
    return this.respostaService.updateResposta(respostaId, updateRespostaDto);
  }

  // DELETE - Deletar resposta
  @Delete(':respostaId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar uma resposta (apenas Admin)' })
  @ApiResponse({ status: 204, description: 'Resposta deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Resposta não encontrada.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async deleteResposta(@Param('respostaId') respostaId: string) {
    return this.respostaService.deleteResposta(respostaId);
  }

  // GET - Buscar respostas por palavra-chave
  @Get('search/:keyword')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Buscar respostas por palavra-chave' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.' })
  async searchRespostas(@Param('keyword') keyword: string) {
    return this.respostaService.searchRespostas(keyword);
  }

  // PATCH - Verificar uma resposta como melhor resposta
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':respostaId/verify')
  @ApiOperation({ summary: 'Marcar resposta como melhor resposta' })
  @ApiResponse({ status: 200, description: 'Resposta verificada com sucesso.' })
  @ApiResponse({ status: 403, description: 'Apenas o autor da dúvida pode verificar uma resposta.' })
  @ApiResponse({ status: 404, description: 'Resposta não encontrada.' })
  async verifyAnswer(
    @Request() req,
    @Param('respostaId') respostaId: string,
  ) {
    const userId = req.user.userId;
    return this.respostaService.verifyAnswer(respostaId, userId);
  }

  // PATCH - Dar like em uma resposta
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':respostaId/like')
  @ApiOperation({ summary: 'Dar like em uma resposta' })
  @ApiResponse({ status: 200, description: 'Like registrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Resposta não encontrada.' })
  async likeResposta(
    @Request() req,
    @Param('respostaId') respostaId: string,
  ) {
    const userId = req.user.userId;
    return this.respostaService.likeResposta(respostaId, userId);
  }

  // PATCH - Dar dislike em uma resposta
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':respostaId/dislike')
  @ApiOperation({ summary: 'Dar dislike em uma resposta' })
  @ApiResponse({ status: 200, description: 'Dislike registrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Resposta não encontrada.' })
  async dislikeResposta(
    @Request() req,
    @Param('respostaId') respostaId: string,
  ) {
    const userId = req.user.userId;
    return this.respostaService.dislikeResposta(respostaId, userId);
  }
}


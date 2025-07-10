/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from 'src/user/services/user.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from '@shared/pipe/zod-validation.pipe';
import { CreateUserDto, createUserSchema } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiBody({
    description: 'login de exemplo.',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'leonardo@teste.com' },
        password: { type: 'string', example: 'senha123' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'retorno do access_token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmNlbG9AdGVzdGUuY29tIiwic3ViIjoiNjc4ODc2N2FmNzk4MmRlNTE1MGQ5MDk3Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzcwNzM2NjcsImV4cCI6MTczNzA3NzI2N30.TYgESpm65v0_JI8eMHtYRMm5FFqmBQp3DRyasz3crgQ',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials.',
  })
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  @ApiBody({
    description: 'login a ser criado.',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'teste@teste.com' },
        password: { type: 'string', example: 'senha123' },
        name: { type: 'string', example: 'Nome de exemplo' },
        role: { 
          type: 'string',
          enum: ['admin', 'user'],
          example: 'admin',
          description: 'Tipo de usuário (admin ou user)' 
        },
      },
      required: ['email', 'password', 'name', 'role'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'usuario criado com sucesso.',
  })
  @ApiResponse({
    status: 409,
    description: 'email em uso.',
  })
  async register(@Body() createUserDto: CreateUserDto) {
  // Adicionando tratamento de erro no controller
  // Isso é importante para capturar erros que podem ocorrer durante a criação do usuário
    try {
    console.log('Tentando criar usuário...');
    return await this.userService.createUser(createUserDto);
  } catch (error) {
    console.error('ERRO NO CONTROLLER:', error);
    // Lançar uma exceção HTTP para que o Nest a trate corretamente
    throw error;
  }
  }
}

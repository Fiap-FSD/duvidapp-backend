import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token de autenticação não fornecido.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.API_SECRET,
      });
      
      // **A CORREÇÃO ESTÁ AQUI**
      // Mapeamos 'payload.sub' para 'userId' e 'payload.name' para 'username'.
      // Isso garante que o objeto 'user' tenha o formato que os serviços esperam.
      request['user'] = {
        userId: payload.sub,
        username: payload.name, // Alterado de payload.username para payload.name
        role: payload.role,
      };

    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }

    return true;
  }
}

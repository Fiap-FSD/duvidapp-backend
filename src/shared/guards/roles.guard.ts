import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // **A CORREÇÃO ESTÁ AQUI**
    // Verificamos se o usuário existe e se ele tem uma role.
    // Em seguida, convertemos a role do usuário para minúsculas antes de comparar.
    const hasRole = () => {
        if (!user || !user.role) {
            return false;
        }
        // Compara a role do usuário (em minúsculas) com as roles necessárias (também em minúsculas)
        return requiredRoles.some((role) => user.role.toLowerCase() === role.toLowerCase());
    }

    if (hasRole()) {
        return true;
    }

    throw new ForbiddenException('Você não tem permissão para acessar este recurso.');
  }
}

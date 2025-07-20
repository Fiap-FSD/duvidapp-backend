import { SetMetadata } from '@nestjs/common';

// A chave que usaremos para armazenar os metadados das roles
export const ROLES_KEY = 'roles';

// O decorator @Roles('Admin', 'User', ...) que usaremos nos controllers
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

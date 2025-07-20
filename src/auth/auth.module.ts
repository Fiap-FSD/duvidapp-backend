import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
// O import do JwtModule não é mais necessário aqui

@Module({
  imports: [
    UserModule,
    // REMOVA o JwtModule.register daqui. Já é global.
  ],
  providers: [AuthService],
  controllers: [AuthController],
  
})
export class AuthModule {}
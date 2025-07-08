import { Module } from '@nestjs/common';
import { DuvidaModule } from './duvida/duvida.module';
import { RespostaModule } from './resposta/resposta.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    AuthModule,
    DuvidaModule,
    RespostaModule,
    JwtModule.register({
      global: true,
      secret: process.env.API_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
})
export class AppModule {}

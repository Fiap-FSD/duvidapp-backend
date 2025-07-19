import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DuvidaModule } from './duvida/duvida.module';
import { RespostaModule } from './resposta/resposta.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // CORREÇÃO 1: Usar forRootAsync para o Mongoose
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    UserModule,
    AuthModule, // O AuthModule já configura e provê o JwtModule
    DuvidaModule,
    RespostaModule,
    // CORREÇÃO 2: O bloco do JwtModule.register foi REMOVIDO daqui
  ],
})
export class AppModule {}
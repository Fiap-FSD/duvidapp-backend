import { Module } from '@nestjs/common';
import { DuvidaModule } from './duvida/duvida.module';
import { RespostaModule } from './resposta/resposta.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importe ConfigService
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1. ConfigModule continua global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. MongooseModule configurado de forma assíncrona
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    // 3. JwtModule configurado de forma assíncrona e global
    JwtModule.registerAsync({
      global: true, // Torna o JwtService disponível em toda a aplicação
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('API_SECRET'),
        signOptions: { expiresIn: '12h' },
      }),
    }),
    
    // 4. Seus outros módulos
    UserModule,
    AuthModule,
    DuvidaModule,
    RespostaModule,
  ],
})
export class AppModule {}
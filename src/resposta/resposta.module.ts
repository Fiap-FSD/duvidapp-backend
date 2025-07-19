// src/resposta/resposta.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Resposta, RespostaSchema } from './schemas/resposta.schema';
import { RespostaController } from './controllers/resposta.controller';
import { RespostaService } from './services/resposta.service';
import { RespostaRepository } from './repositories/resposta.repository';
import { RespostaMongooseRepository } from './repositories/mongoose/resposta.mongoose.repository';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Resposta.name, schema: RespostaSchema }]),
  ],
  controllers: [RespostaController],
  providers: [
    // 👇 A MUDANÇA ESTÁ AQUI
    RespostaService,
    {
      provide: RespostaRepository,
      useClass: RespostaMongooseRepository,
    },
  ],
  // 👇 E AGORA O EXPORT VAI FUNCIONAR
  exports: [RespostaRepository],
})
export class RespostaModule {}
// src/duvida/duvida.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module'; // <-- IMPORTE O AuthModule
import { RespostaModule } from '../resposta/resposta.module';
import { Duvida, DuvidaSchema } from './schemas/duvida.schema';
import { DuvidaController } from './controllers/duvida.controller';
import { DuvidaService } from './services/duvida.service';
import { DuvidaRepository } from './repositories/duvida.repository';
import { DuvidaMongooseRepository } from './repositories/mongoose/duvida.mongoose.repository';

@Module({
  imports: [
    forwardRef(() => AuthModule), // <-- ADICIONE O AuthModule AQUI
    forwardRef(() => RespostaModule),
    MongooseModule.forFeature([{ name: Duvida.name, schema: DuvidaSchema }]),
  ],
  controllers: [DuvidaController],
  providers: [
    DuvidaService,
    {
      provide: DuvidaRepository,
      useClass: DuvidaMongooseRepository,
    },
  ],
})
export class DuvidaModule {}
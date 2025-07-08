import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DuvidaSchema, Duvida } from './schemas/duvida.schema';
import { DuvidaRepository } from './repositories/duvida.repository';
import { DuvidaMongooseRepository } from './repositories/mongoose/duvida.mongoose.repository';
import { DuvidaService } from './services/duvida.service';
import { DuvidaController } from './controllers/duvida.controller';
import { RespostaModule } from 'src/resposta/resposta.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Duvida.name,
        schema: DuvidaSchema,
      },
    ]),
    RespostaModule,
  ],
  providers: [
    {
      provide: DuvidaRepository,
      useClass: DuvidaMongooseRepository,
    },
    DuvidaService,
  ],
  controllers: [DuvidaController],
})
export class DuvidaModule {}

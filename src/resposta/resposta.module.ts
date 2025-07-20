import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RespostaSchema, Resposta } from './schemas/resposta.schema';
import { RespostaRepository } from './repositories/resposta.repository';
import { RespostaMongooseRepository } from './repositories/mongoose/resposta.mongoose.repository';
import { RespostaService } from './services/resposta.service';
import { RespostaController } from './controllers/resposta.controller';
import { DuvidaModule } from '../duvida/duvida.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Resposta.name,
        schema: RespostaSchema,
      },
    ]),
    // Usa forwardRef para quebrar a dependência circular
    forwardRef(() => DuvidaModule),
  ],
  providers: [
    {
      provide: RespostaRepository,
      useClass: RespostaMongooseRepository,
    },
    RespostaService,
  ],
  controllers: [RespostaController],
  // Exporta o repositório para que outros módulos possam injetá-lo
  exports: [RespostaRepository],
})
export class RespostaModule {}

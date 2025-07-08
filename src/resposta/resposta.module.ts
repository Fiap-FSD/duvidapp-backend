import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RespostaSchema, Resposta } from './schemas/resposta.schema';
import { RespostaRepository } from './repositories/resposta.repository';
import { RespostaMongooseRepository } from './repositories/mongoose/resposta.mongoose.repository';
import { RespostaService } from './services/resposta.service';
import { RespostaController } from './controllers/resposta.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Resposta.name,
        schema: RespostaSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: RespostaRepository,
      useClass: RespostaMongooseRepository,
    },
    RespostaService,
  ],
  controllers: [RespostaController],
  exports: [RespostaRepository],
})
export class RespostaModule {}

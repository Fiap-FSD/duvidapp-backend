import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupRedoc } from './shared/middlewares/redoc.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  // Habilitar o CORS para aceitar qualquer origem e permitir o cabeçalho Authorization (Bearer Token)
  app.enableCors({
    origin: true,  // Permite qualquer origem (pode ser qualquer domínio)
    methods: 'GET, POST, PUT, DELETE, PATCH', // Permite os métodos HTTP necessários
    allowedHeaders: 'Content-Type, Authorization', // Permite os cabeçalhos necessários, incluindo o Authorization
  });

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('API de Blogging')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  setupRedoc(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

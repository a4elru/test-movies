import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets('static', { prefix: '/static/' });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('test-movies')
    .setDescription(
      'Тестовый проект - RESTful сервис хранения сведений о фильмах.',
    )
    .setVersion('1.0.3')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}

bootstrap();

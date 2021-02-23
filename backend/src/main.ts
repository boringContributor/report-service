import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './report.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');

  // build swagger
  const options = new DocumentBuilder()
    .setTitle('Reports')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v1', app, document);

  await app.listen(8000, () => Logger.log(`Listening on port 8000`, 'Reports'));
};
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';

const port = process.env.PORT ?? 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const document = await readFile(
    join(__dirname, '..', 'doc/api.yaml'),
    'utf-8',
  );
  SwaggerModule.setup('doc', app, parse(document));
  await app.listen(port);
}
bootstrap();

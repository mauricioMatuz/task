import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ConfigModule.forRoot({ isGlobal: true }),
    app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

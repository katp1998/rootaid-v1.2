import { NestFactory } from '@nestjs/core';
import { DynamoDB } from 'database/client';
import { AppModule } from './app.module';

async function bootstrap() {

  // Config dynamodb
  DynamoDB;

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

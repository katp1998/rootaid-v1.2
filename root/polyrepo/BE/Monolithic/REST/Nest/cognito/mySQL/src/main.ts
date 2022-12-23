import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //the middleware that parses cookies attached to client request
  app.use(cookieParser());
  await app.listen(3333);
}
bootstrap();

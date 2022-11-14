import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { useLogger } from './utils/userlogger';


@Module({
  imports: [
    WinstonModule.forRoot( useLogger)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

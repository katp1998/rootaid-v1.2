import {
  Controller,
  Get,
  Inject,
  LoggerService
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService
  ) { }




  @Get()
  getHello(): string {
    // logger
    this.logger.log('Calling getHello()');
    return this.appService.getHello();
  }
}

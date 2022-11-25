import { Controller, Get, UseGuards } from '@nestjs/common';
import { Protect } from 'src/utils/Guards';

@Controller('user')
export class UserController {
  @Get('google/login')
  @UseGuards(Protect)
  handleLogin() {
    return { msg: 'Google Authentication in place' };
  }

  @Get('google/redirect')
  @UseGuards(Protect)
  handleRedirect() {
    return { msg: 'okay!' };
  }
}

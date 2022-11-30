import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { Protect } from 'src/utils/Guards';

@Controller('user')
export class UserController {
  @Get('google/login')
  @UseGuards(Protect)
  handleLogin() {
    return { msg: 'Google Authentication in place' };
  }

  //message to be displayed when the user is logged in:
  @Get('google/redirect')
  @UseGuards(Protect)
  handleRedirect() {
    return { msg: 'okay!' };
  }

  //To check if the user is serialized or not
  @Get('status')
  user(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Unauthenticated' };
    }
  }
}

import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from './utils/google-oauth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Request() req) {}
  
    @Get('google/redirect')
    @UseGuards(GoogleOAuthGuard)
    googleAuthRedirect(@Request() req) {
      return this.userService.googleLogin(req);
    }
    

     //To check if the user is serialized or not
    @Get('status')
    user(@Request() req) {
      console.log(req.user);
      if (req.user) {
        return { msg: 'Authenticated' };
      } else {
        return { msg: 'Unauthenticated' };
      }
    }

}

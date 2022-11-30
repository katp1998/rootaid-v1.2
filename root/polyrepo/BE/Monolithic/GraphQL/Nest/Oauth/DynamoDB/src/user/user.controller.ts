import {
    Controller,
    Get,
    UseGuards,
    Request
} from '@nestjs/common';
import { UserService } from './user.service';
import { GoogleOAuthGuard } from './utils/google-oauth.guard';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }
    
    // redirect route
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

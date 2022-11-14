import {
    Controller,
    Post,
    Body
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { logindto } from './dto/login.dto';

@Controller('auth')
    
export class AuthController {

        constructor(
            private authService : AuthService
        ) { }

            
    @Post()
    async login(@Body() loginDTO: logindto)
    {
        return this.authService.validateUser(loginDTO);
    }
}

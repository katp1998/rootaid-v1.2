import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterDto) {
        const {username, password, email} = dto

        let userAttr = []
        userAttr.push({Name: 'email', Value: email})

        return this.authService.register(username, password, userAttr)
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        const {username, password} = dto
        
        return this.authService.login(username, password)
    }
}
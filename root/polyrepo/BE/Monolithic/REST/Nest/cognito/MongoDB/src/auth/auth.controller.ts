import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post('register')
<<<<<<< HEAD
    register(@Body() dto: RegisterDto) {
=======
    handleRegister(@Body() dto: RegisterDto) {
>>>>>>> 08d9adf003fb816f4599d822e7cfa23df32d78d2
        const {username, password, email} = dto

        let userAttr = []
        userAttr.push({Name: 'email', Value: email})

<<<<<<< HEAD
        return this.authService.register(username, password, userAttr)
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        const {username, password} = dto
        
        return this.authService.login(username, password)
=======
        return this.authService.registerUser(username, password, userAttr)
    }

    @Post('login')
    handleLogin(@Body() dto: LoginDto) {
        const {username, password} = dto

        return this.authService.loginUser(username, password)
>>>>>>> 08d9adf003fb816f4599d822e7cfa23df32d78d2
    }
}
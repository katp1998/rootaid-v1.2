import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterDto, LoginDto } from "./dto";

@Controller('user')
export class UserController {
    constructor(private userService : UserService) {}

    @Post('register')
    handleRegister(@Body() dto: RegisterDto) {
        const {username, password, email} = dto

        let userAttr = []
        userAttr.push({Name: 'email', Value: email})

        return this.userService.registerUser(username, password, userAttr)
    }

    @Post('login')
    handleLogin(@Body() dto: LoginDto) {
        const {username, password} = dto

        return this.userService.loginUser(username, password)
    }
}
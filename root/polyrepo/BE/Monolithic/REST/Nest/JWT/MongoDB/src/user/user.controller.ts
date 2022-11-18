import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { logindto } from './dto/login.dto';
import { userCreatedto } from './dto/user.create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) { }


     // Register user
     @Post("/register")
     createUser(@Body() userCreateDTO: userCreatedto)
     {
         return this.userService.register(userCreateDTO);
     }
 
     @Post("/login")
     async login(@Body() loginDTO: logindto)
     {
         return this.userService.validateUser(loginDTO);
     }
 
    // Protect route
    @UseGuards(AuthGuard('jwt'))
    @Get("/get")
    async getUser()
    {
        return { name: "Jhon", email: "jhon@gmail.com" };
    }
}

import { Controller, Post, Body } from '@nestjs/common';
import { userCreatedto } from './dto/userCreate.dto';
import { UserService } from './user.service';

@Controller('user')
    
export class UserController {
    constructor(
        private userService: UserService
    ) { }
    
    // Register user
    @Post()
    createUser(@Body() userCreateDTO: userCreatedto) {
        return this.userService.register(userCreateDTO);
    }


    
}

import { Controller, Post, Body } from '@nestjs/common';
import { userCreatedto } from './dto/userCreate.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService)
    { }

    @Post()
    createUser(@Body() userCreatedto: userCreatedto)
    {
        return this.userService.register(userCreatedto);
    }
}

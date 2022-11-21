import {
    Controller,
    Post,
    Get,
    Body
} from '@nestjs/common';
import { userCreatedto } from './dto/userCreate.dto';
import { UserService } from './user.service';
import {
    Public,
    Roles
} from 'nest-keycloak-connect';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    )
    { }

          
// Register user
@Public()
@Post('register')
createUser(@Body() userCreateDTO: userCreatedto)
{
    return this.userService.createUser(userCreateDTO);
}

// Login user
@Public()
@Post('login')
loginUser(@Body() userCreateDTO: userCreatedto)
{
    return this.userService.loginUser(userCreateDTO);
}

// protect route

@Roles({ roles: [] })
@Get()
getuser()
{
    return "hello";
}
}

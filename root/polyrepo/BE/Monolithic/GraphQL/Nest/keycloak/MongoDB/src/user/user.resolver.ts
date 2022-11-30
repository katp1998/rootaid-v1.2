import {
    Resolver,
    Query,
    Mutation,
    Args
} from '@nestjs/graphql';
import { User } from 'database/user.entity';
import { LoginUserInput } from './inputs/auth.input';
import { CreateUserInput } from './inputs/user.input';
import { CreateUserOutput } from './outputs/createUser.output';
import { LoggedInUserOutput } from './outputs/loginUser.output';
import { UserService } from './user.service';
import {
    Roles,
    Public
} from 'nest-keycloak-connect';

@Resolver()
export class UserResolver {

    constructor(
        private userService: UserService
    ) { }

     // Protect route

     @Roles({ roles: ['user'] })
     // @Public()
     @Query((returns) => [User])
     getAllUser() {
         return [
             { username: "Thanis", password: "23eddd" },
             {username:"Thaniddds",password:"23eddddd"},
         ]
     }
    
     // login
     @Public()
     @Mutation((returns) => LoggedInUserOutput)
     logIn(@Args('input') input:LoginUserInput) {
         return this.userService.loginUser(input);
     }
     
     // register
     @Public()
     @Mutation((returns) => CreateUserOutput)
     createUser(@Args('input') input:CreateUserInput) {
         return this.userService.createUser(input);
 }

}

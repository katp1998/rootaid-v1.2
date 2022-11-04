import {
    Resolver,
    Mutation,
    Args,
    Query
} from '@nestjs/graphql';
import { CreateUserInput } from './inputs/createUser.input';
import { CreateUserOutput } from './outputs/createUser.output';
import { LoggedInUserOutput } from './outputs/loggedInUser.output';
import { User } from './models/user.schema';
import { UserService } from './user.service';
import { Roles } from 'nest-keycloak-connect';

@Resolver((of) => User)
    
export class UserResolver {
    
    constructor(private userService: UserService)
    { }
    
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

    @Mutation((returns) => LoggedInUserOutput)
    logIn(@Args('input') input:CreateUserInput) {
        return this.userService.loginUser(input);
    }
    
    // register
    @Mutation((returns) => CreateUserOutput)
    createUser(@Args('input') input:CreateUserInput) {
        return this.userService.createUser(input);
}
}

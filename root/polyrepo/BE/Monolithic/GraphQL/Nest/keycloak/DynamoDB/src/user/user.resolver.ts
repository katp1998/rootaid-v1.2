import {
    Resolver,
    Query,
    Mutation,
    Args
} from '@nestjs/graphql';
import {
    Roles,
    Public
} from 'nest-keycloak-connect';
import { LoginUserInput } from './inputs/auth.inputs';
import { CreateUserInput } from './inputs/user.input';
import { CreateUserOutput } from './outputs/createUser.output';
import { LoggedInUserOutput } from './outputs/loginUser.output';
import { UserType } from './types/userType';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(private userService: UserService)
    { }

    // Protect route

    @Roles({ roles: ['user'] })
    // @Public()
    @Query((returns) => UserType)
    getAllUser() {
        return {
            name: "John",
            email: "Jhon@gmail.com",
            password: "123456"
        }
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

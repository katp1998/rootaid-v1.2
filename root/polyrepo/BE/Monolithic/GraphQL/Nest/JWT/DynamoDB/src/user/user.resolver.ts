import {
    Resolver,
    Mutation,
    Args,
    Query
} from '@nestjs/graphql';
import { LoginUserInput } from './inputs/auth.input';
import { CreateUserInput } from './inputs/user.input';
import { GqlAuthGuard } from './jwt-auth.guard';
import { LoginUserOutput } from './outputs/loginUser.output';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { userCreateOutput } from './outputs/userCreate.output';

@Resolver()
export class UserResolver {
    constructor(
        private userService: UserService
    ) { }

    // Create User

    @Mutation((returns) => userCreateOutput)
    createUser(@Args('input') input:CreateUserInput) {
        return this.userService.registerUser(input);
    }

    // login user

    @Mutation((returns) => LoginUserOutput)
    loginUser(@Args('input') input:LoginUserInput) {
        
        return this.userService.validateUser(input);
    }


    // protect route
    @UseGuards(GqlAuthGuard)
    @Query((returns) => userCreateOutput)
    getAllUser() {
        return {name:"John",email:"John@gmail.com",password:"1234567"}
    }

}

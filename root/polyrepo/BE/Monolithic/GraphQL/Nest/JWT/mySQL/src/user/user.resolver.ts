import {
    Resolver,
    Query,
    Mutation,
    Args } from '@nestjs/graphql';
import { User } from 'database/models/user.schema';
import { LoginUserInput } from './inputs/auth.inputs';
import { CreateUserInput } from './inputs/user.input';
import { LoginUserOutput } from './outputs/loginUser.output';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './jwt-auth.guard';


@Resolver()
export class UserResolver {
    constructor(
        private userService: UserService
    ) { }

    // Create User

    @Mutation((returns) => User)
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
    @Query((returns) => User)
    getAllUser() {
        return {name:"John",email:"John@gmail.com",password:"1234567"}
    }
}

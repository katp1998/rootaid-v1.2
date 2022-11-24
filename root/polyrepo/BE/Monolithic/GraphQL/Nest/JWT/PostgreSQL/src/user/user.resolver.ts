import { Resolver } from '@nestjs/graphql';
import { User } from 'database/model/user.entity';
import { LoginUserInput } from './inputs/auth.input';
import { CreateUserInput } from './inputs/user.input';
import { LoginUserOutput } from './outputs/loginUser.output';
import { UserService } from './user.service';
import {
    Query,
    Mutation,
    Args } from '@nestjs/graphql';
import { GqlAuthGuard } from './jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

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

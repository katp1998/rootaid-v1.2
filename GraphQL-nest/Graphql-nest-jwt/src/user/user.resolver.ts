import {
    Resolver,
    Query,
    Mutation,
    Args
} from '@nestjs/graphql';
import { CreateUserInput } from './inputs/user.input';
import { User } from './models/user.schema';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/user/jwt-auth.guard';
import { LoginUserOutput } from 'src/user/outputs/loginUser.output';
import { LoginUserInput } from 'src/user/inputs/auth.input';

@Resolver((of) => User)
    
export class UserResolver {
    
    constructor(
        private userService: UserService
    ) { }
    
    // Protect route
    @UseGuards(GqlAuthGuard)
    @Query((returns) => [User])
    getAllUser() {
        return this.userService.getallUser()
    }

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

}

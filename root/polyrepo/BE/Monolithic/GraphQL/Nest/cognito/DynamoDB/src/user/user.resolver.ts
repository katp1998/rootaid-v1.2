import { LoginUserInput } from './inputs/auth.input';
import { CreateUserInput } from './inputs/user.input';
// import { GqlAuthGuard } from './jwt-auth.guard';
import { LoginUserOutput } from './outputs/auth.output';
import { UserService } from './user.service';
import {
    Resolver,
    Query,
    Mutation,
    Args
} from '@nestjs/graphql';
// import { UseGuards } from '@nestjs/common';
import { CreateUserOutput } from './outputs/user.output';
    


@Resolver()
export class UserResolver {

    constructor(
        private userService: UserService
    ) { }

    @Query(() => String)
    sayHello(): string {
        return 'Hello World!';
    }    

    // Create User

    @Mutation((returns) => CreateUserOutput)
    createUser(@Args('input') input:CreateUserInput) {
        const username = input.username
        const password = input.password
        let userAttr = []
        userAttr.push({Name: 'email', Value: input.email})
        return this.userService.registerUser(username, password, userAttr);
    }
    
    // login user

    @Mutation((returns) => LoginUserOutput)
    loginUser(@Args('input') input:LoginUserInput) {
        const username = input.username
        const password = input.password        
        return this.userService.loginUser(username, password);
    }


    // // protect route
    // @UseGuards(GqlAuthGuard)
    // @Query((returns) => User)
    // getAllUser() {
    //     return {name:"John",email:"John@gmail.com",password:"1234567"}
    // }
}
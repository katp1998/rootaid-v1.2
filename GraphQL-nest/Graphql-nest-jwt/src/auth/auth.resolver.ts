import { Resolver,Mutation,Args } from '@nestjs/graphql';
import { User } from 'src/user/user.schema';
import { LoginUserInput } from './auth.input';
import { AuthService } from './auth.service';

@Resolver((of) => User)
export class AuthResolver {

    constructor(
        private authService : AuthService
    ){}

    @Mutation((returns) => User)
    loginUser(@Args('input') input:LoginUserInput) {
        
        return this.authService.validateUser(input);
    }


}

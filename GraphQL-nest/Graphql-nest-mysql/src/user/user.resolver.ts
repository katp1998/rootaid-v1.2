import { Resolver ,Query,Mutation,Args} from '@nestjs/graphql';
import { CreateUserInput } from './user.input';
import { User } from './user.schema';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
    constructor(
        private userService: UserService
    ) { }
    

    @Query((returns) => [User])
    getAllUser() {
        return this.userService.getallUser()
    }

    @Mutation((returns) => User)
    createUser(@Args('input') input:CreateUserInput) {
        return this.userService.registerUser(input);
}
}

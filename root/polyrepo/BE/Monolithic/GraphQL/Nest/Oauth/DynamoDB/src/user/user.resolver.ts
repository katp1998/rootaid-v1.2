import {
    Resolver,
    Query,
    Mutation,
Args} from '@nestjs/graphql';
import { CreateUserInput } from './inputs/user.input';
import { UserCreateOutput } from './outputs/userCreate.output';
import { UserType } from './types/userType';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) { }

      // sample Query
      @Query((returns) => UserType)
      getAllUser() {
          return {name:"John",email:"John@gmail.com"}
      }
  
      // Sample mutation
      @Mutation((returns) =>UserCreateOutput )
      createUser(@Args('input') input:CreateUserInput) {
          return this.userService.registerUser(input);
      }
  
}

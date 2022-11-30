import {
    Field,
    ObjectType
} from '@nestjs/graphql';
// import { CreateUserInput } from '../inputs/user.input';


@ObjectType()
    
export class UserType {
    
    @Field() 
    name: string;
    
    @Field()
    email: string;
    
}
import {
    Field,
    ObjectType
} from '@nestjs/graphql';
import { UserType } from '../types/userType';
// import { CreateUserInput } from '../inputs/user.input';


@ObjectType()
    
export class LoggedInUserOutput {
    
    @Field() 
    message: string;
    
    @Field({nullable:true})
    refresh_token: string;
    
    @Field({nullable:true})
    access_token: string;

    @Field({ nullable: true })
    user: UserType;
    

}
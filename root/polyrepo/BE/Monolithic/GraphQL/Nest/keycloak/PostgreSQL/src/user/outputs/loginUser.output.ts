import {
    Field,
    ObjectType
} from '@nestjs/graphql';
import { User } from 'database/models/user.entity';


@ObjectType()
    
export class LoggedInUserOutput {
    
    @Field() 
    message: string;
    
    @Field({nullable:true})
    refresh_token: string;
    
    @Field({nullable:true})
    access_token: string;

    @Field({nullable:true})
    user: User;
    

}
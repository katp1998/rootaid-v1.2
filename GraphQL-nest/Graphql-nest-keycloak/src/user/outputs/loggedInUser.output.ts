import {
    Field,
    ObjectType
} from '@nestjs/graphql';

@ObjectType()
    
export class LoggedInUserOutput {
    
    @Field() 
    message: string;
    
    @Field({nullable:true})
    refresh_token: string;
    
    @Field({nullable:true})
    access_token: string;
    

}
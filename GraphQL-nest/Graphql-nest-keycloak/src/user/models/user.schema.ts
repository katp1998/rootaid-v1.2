import {
    Field,
    ObjectType
} from "@nestjs/graphql";


@ObjectType()

export class User
{
 
    @Field()
    username: string;

    @Field()
    password: string;

  
}
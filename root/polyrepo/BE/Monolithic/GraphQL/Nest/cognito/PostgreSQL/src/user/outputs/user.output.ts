import {
    Field,
    ObjectType
  } from '@nestjs/graphql';
  
  @ObjectType()
    
  export class CreateUserOutput {
      
    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    email: string;
  }
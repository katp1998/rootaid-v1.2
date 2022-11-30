import {
    Field,
    ObjectType
  } from '@nestjs/graphql';
  
  @ObjectType()
    
  export class userCreateOutput {
      
      @Field()
      userid: string;

      @Field()
      name: string;

      @Field()
      email: string;

      @Field()
      password: string;
      
  }
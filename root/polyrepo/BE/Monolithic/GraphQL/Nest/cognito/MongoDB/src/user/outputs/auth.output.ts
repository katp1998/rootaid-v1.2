import {
    Field,
    ObjectType
  } from '@nestjs/graphql';
  
  @ObjectType()
    
  export class LoginUserOutput {
      
    @Field()
    access_token: string;

    @Field()
    refresh_token: string;

    @Field()
    expires_in: string;
  }
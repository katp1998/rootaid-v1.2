import {
    Field,
    ObjectType
  } from '@nestjs/graphql';
import { UserType } from '../types/userType';
  
  @ObjectType()
    
  export class UserCreateOutput {
      
      @Field()
      message: string;
      
      @Field()
      user: UserType;
      
  }
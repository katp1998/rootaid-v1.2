import {
    Field,
    ObjectType
  } from '@nestjs/graphql';
import { User } from 'src/database/models/user.entity';
  
  @ObjectType()
    
  export class UserCreateOutput {
      
      @Field()
      message: string;
      
      @Field()
      user: User;
      
  }
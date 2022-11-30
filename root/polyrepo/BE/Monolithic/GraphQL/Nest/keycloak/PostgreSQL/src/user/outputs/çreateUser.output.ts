import {
    Field,
    ObjectType
  } from '@nestjs/graphql';
import { User } from 'database/models/user.entity';

  
  @ObjectType()
  export class CreateUserOutput {
      
    @Field()
    message: string;
  
    @Field()
    user: User;
  }
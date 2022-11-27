import {
  Field,
  ObjectType
} from '@nestjs/graphql';
import { User } from 'database/model/user.entity';

@ObjectType()
export class CreateUserOutput {
    
  @Field()
  message: string;

  @Field()
  user: User;
}
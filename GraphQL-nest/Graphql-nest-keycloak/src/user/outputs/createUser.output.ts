import {
  Field,
  ObjectType
} from '@nestjs/graphql';

@ObjectType()
export class CreateUserOutput {
    
  @Field()
  message: string;
}
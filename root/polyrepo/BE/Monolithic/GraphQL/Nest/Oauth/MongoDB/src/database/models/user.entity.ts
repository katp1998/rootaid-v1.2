import {
    Column,
    Entity,
    ObjectIdColumn
} from "typeorm";

import {
    Field,
    Int,
    ObjectType
} from "@nestjs/graphql";

@Entity()
@ObjectType()
    
export class User{
    
    @ObjectIdColumn()
    @Field((type => Int))
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    email: string;
    
}
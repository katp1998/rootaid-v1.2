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
    username: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;
}
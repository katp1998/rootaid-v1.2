import {
    Column,
    Entity,
    ObjectIdColumn
} from "typeorm";

@Entity()
    
export class User{
    
    @ObjectIdColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
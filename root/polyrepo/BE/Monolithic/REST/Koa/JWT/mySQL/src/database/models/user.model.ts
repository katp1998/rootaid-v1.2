import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
    _id!: string;

  @Column()
    name!: string;

  @Column()
    email!: string;

  @Column()
    password!: string;


}
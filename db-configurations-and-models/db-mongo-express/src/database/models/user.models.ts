import {Entity, ObjectIdColumn, Column, BaseEntity} from 'typeorm'
import {ObjectId} from 'mongodb'

@Entity()
export class User extends BaseEntity{
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;


}
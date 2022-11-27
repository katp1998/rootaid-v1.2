import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: any;

  @Column()
  email: any;
}

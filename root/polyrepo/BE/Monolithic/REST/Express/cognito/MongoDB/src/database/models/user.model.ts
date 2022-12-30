import { Entity, ObjectIdColumn, Column, BaseEntity, ObjectID } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn({ primary: true })
  _id!: ObjectID;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  refreshToken!: string;
}

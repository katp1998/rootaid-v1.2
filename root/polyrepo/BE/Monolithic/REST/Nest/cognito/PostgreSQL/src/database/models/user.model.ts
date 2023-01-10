import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
  
  @Column({ nullable: true })
  refreshToken!: string;
}

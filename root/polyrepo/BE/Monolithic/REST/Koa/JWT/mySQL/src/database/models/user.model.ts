import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    _id!: number;

  @Column()
    name!: string;

  @Column()
    email!: string;

  @Column()
    password!: string;


}
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Long } from "typeorm";

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

  @Column({ type: "longtext",nullable: true })
  refreshToken!: string;
}
// import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'

// @Entity()
// export class User extends BaseEntity{
//   @PrimaryGeneratedColumn({ type: 'int' })
//   _id!: number;

//   @Column()
//   name!: string;

//   @Column()
//   email!: string;

//   @Column()
//   password!: string;


// }

//------------------------------------------------------------------------------------

// import { CreateTableInput, CreateTableCommand } from "@aws-sdk/client-dynamodb";
// import client from '../client'

// const userTableParams: CreateTableInput = {
//   TableName: 'test_db',
//   KeySchema: [{AttributeName: 'PK', KeyType: 'HASH'}],
//   AttributeDefinitions: [{ AttributeName: 'PK', AttributeType: 'N'}]
// }

// const command = new CreateTableCommand(userTableParams)
// client.send(command).then(r => {
//   console.log(r)
// }).catch(e => {
//   console.log('error', e)
// })

//------------------------------------------------------------------------------------

import * as dynamoose from "dynamoose";

const schema = new dynamoose.Schema({
    "id": String,
    "username": String,
    "email": String,
    "password": String,

}, {
    "saveUnknown": true,
    "timestamps": true
});

export const User = dynamoose.model("User", schema);

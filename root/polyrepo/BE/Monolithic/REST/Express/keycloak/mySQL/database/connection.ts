import config from '../config';
import { createConnection } from 'typeorm';
import { User } from './models/user.models';


export const connection = createConnection({
  type:'mysql',
  database: config.dbName,
  username: config.dbUsername,
  password: null,
  logging: true,
  synchronize: true,
  entities: [User]
  })
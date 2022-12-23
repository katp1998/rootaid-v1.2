import { createConnection } from 'typeorm';
import { User } from './models/user.model';
import config from '../config'

export const connection = createConnection({
  type:'mysql',
  database: config.db, 
  username: config.dbUsername,
  password: config.dbPassword, 
  port: config.dbPort,
  logging: true,
  synchronize: true,
  entities: [User],
});
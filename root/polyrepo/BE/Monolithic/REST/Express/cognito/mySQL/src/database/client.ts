import { createConnection } from 'typeorm';
import { User } from './models/user.model';
import config from '../config'

export const connection = () => createConnection({
  type:'mysql',
  database: config.db, 
  username: config.dbUsername,
  password: config.dbPassword, 
  port: 3306,
  synchronize: true,
  entities: [User],
});
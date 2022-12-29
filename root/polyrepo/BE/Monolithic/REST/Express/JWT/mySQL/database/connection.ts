import { createConnection } from 'typeorm';
import { User } from './models/user.model';

export const connection = createConnection({
  type:'mysql',
  database: 'users', 
  username: 'root',
  password: 'Rm1tvkTr', 
  port: 3306,
  logging: true,
  synchronize: true,
  entities: [User],
});
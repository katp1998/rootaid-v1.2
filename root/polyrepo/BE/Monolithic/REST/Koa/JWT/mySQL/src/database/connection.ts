import { createConnection } from 'typeorm';
import { User } from './models/user.model';

export const connection = createConnection({
  type:'mysql',
  database: 'users', 
  username: 'root',
  password: '1234', 
  logging: true,
  synchronize: true,
  entities: [User],
});

//process.env.DB_NAME,
//process.env.DB_USERNAME,
//process.env.DB_PASSWORD,
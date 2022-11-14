import { createConnection } from 'typeorm';
import { User } from './models/user.model';

export const connection = createConnection({
    type:'postgres',
    host:process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
      entities: [User]
  })
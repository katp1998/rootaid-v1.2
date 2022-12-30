import { createConnection } from 'typeorm';
import { User } from './models/user.model';
import config from '../config'

export const connection = () => {createConnection({
    type:'postgres',
    host:process.env.DB_HOST,
    port: 5432,
    database: config.db,
    username: config.dbUsername,
    password: config.dbPassword,
    synchronize: true,
      entities: [User]
  })}
import config from '../config';
import { createConnection } from 'typeorm';
import { User } from './models/user.model';


export const connection = createConnection({
    type:'mysql',
    database: config.dbName,
    username: config.dbUsername,
    password: undefined,
    logging: true,
    synchronize: true,
    entities: [User],
})
  
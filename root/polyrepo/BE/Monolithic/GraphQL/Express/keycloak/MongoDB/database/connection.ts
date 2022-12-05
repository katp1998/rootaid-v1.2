import { createConnection } from 'typeorm';
import config from '../config';
import { User } from './models/user.model';


export const connection = createConnection({
  type:'mongodb',
  url: config.dbURL,
  useNewUrlParser:true,
  useUnifiedTopology:true,
  logging: true,
  synchronize: true,
  entities: [User],
});


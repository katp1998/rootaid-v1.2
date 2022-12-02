import { createConnection } from 'typeorm';
import { User } from './models/user.model';
import dotenv from 'dotenv';
import config from '../../config';


export const connection = createConnection({
  type:'mongodb',
  url: config.mongoURL,
  useNewUrlParser:true,
  useUnifiedTopology:true,
  logging: true,
  synchronize: true,
  entities: [User],
  
});


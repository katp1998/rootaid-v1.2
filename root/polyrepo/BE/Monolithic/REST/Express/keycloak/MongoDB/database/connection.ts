import { createConnection } from 'typeorm';
import { User } from './models/user.models';

export const connection = createConnection({
  type:'mongodb',
  url: process.env.MONGO_URI,
  useNewUrlParser:true,
  useUnifiedTopology:true,
  logging: true,
  synchronize: true,
  entities: [User],
});

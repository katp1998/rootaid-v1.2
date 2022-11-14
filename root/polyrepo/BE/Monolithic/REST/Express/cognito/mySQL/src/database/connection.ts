import {createConnection} from 'typeorm'
import { User } from './models/user.models'

export const connection = createConnection({
    type:'mysql',
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
      entities: [User]
  })


import config from '../../config/index'
import {createConnection} from 'typeorm'
import { User } from './models/user.model'

export const connection = createConnection({
  type: 'postgres',
  host: config.dbHost,
  port: parseInt(config.dbPort),
  database: config.dbName,
  username: config.dbUsername,
  password: config.dbPassword,
  logging: true,
  synchronize: true,
  entities: [User]
  })


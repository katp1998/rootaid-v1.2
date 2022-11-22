'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.connection = void 0;
const typeorm_1 = require('typeorm');
const user_model_1 = require('./models/user.model');
exports.connection = (0, typeorm_1.createConnection)({
  type: 'mysql',
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: true,
  synchronize: true,
  entities: [user_model_1.User],
});

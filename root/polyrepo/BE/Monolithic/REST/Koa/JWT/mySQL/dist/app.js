'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const koa_1 = __importDefault(require('koa'));
const koa_router_1 = __importDefault(require('koa-router'));
const dotenv_1 = __importDefault(require('dotenv'));
const connection_1 = require('./database/connection');
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
//IMPORTING KOA MIDDLEWARE:
const app = new koa_1.default();
const router = new koa_router_1.default();
//ADDING ROUTES:
//app.use("/", userRoutes)
//CONNECTING TO DATABASE:
connection_1.connection.then(() => console.log('Database connected')).catch((error) => console.log(error, 'Database connection unsuccessful'));
//CONNECTION TO PORT:
app.listen(PORT, () => {
  console.log(`This application is listening on port ${PORT}`);
});

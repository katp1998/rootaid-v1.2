"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const user_models_1 = require("./database/models/user.models");
require("reflect-metadata");
//import userRoutes from './api/routes/userRoutes'
dotenv_1.default.config();
//GETTING PORT FROM .ENV FILE:
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
//IMPORTING EXPRESS MIDDLEWARE:
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
//SYNCING DATABASE:
(0, typeorm_1.createConnection)({
    type: 'mongodb',
    url: process.env.MONGO_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    logging: true,
    synchronize: true,
    entities: [user_models_1.User]
}).then(() => console.log("Database connected")).catch((error) => console.log(error, 'Database connection unsuccessful'));
//ADDING USER ROUTES:
//app.use("/api/users", userRoutes)
//CONNECTION TO PORT:
app.listen(PORT, () => {
    console.log(`This application is listening on port ${PORT}`);
});

"use strict";
//this is directly imported in app.js, hence this is not needed
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const typeorm_1 = require("typeorm");
const user_models_1 = require("./models/user.models");
exports.connection = (0, typeorm_1.createConnection)({
    type: 'mongodb',
    url: process.env.MONGO_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    logging: true,
    synchronize: true,
    entities: [user_models_1.User]
});

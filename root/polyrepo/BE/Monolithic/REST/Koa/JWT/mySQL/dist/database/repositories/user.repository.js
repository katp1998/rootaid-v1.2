"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUser = void 0;
//koa was not used in this process
const user_model_1 = require("../models/user.model");
//@DESC: FIND IF USER EXISTS
//@ROUTE: POST
const findUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.findOneBy({ email });
    return existingUser;
});
exports.findUser = findUser;
//@desc CREATING USER
//@route POST
const createUser = ({ name, email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.findOneBy({ email });
    if (!existingUser) {
        try {
            //CREATE USER:
            const user = yield user_model_1.User.save({
                name,
                email,
                password,
            });
            return user;
        }
        catch (error) {
            return error;
        }
    }
    else {
        return { message: "user exists" };
    }
});
exports.createUser = createUser;

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
const user_models_1 = require("../models/user.models");
//@DESC: FIND IF USER EXISTS
//@ROUTE: POST /api/v1.2/auth/
const findUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    //CHECK IF USER WITH SAME EMAIL ADDRESS EXISTS
    try {
        const existingUser = yield user_models_1.User.findOne({ where: { email } });
        return existingUser;
    }
    catch (error) {
        console.log(error);
    }
});
exports.findUser = findUser;
//@desc CREATING USER
//@route POST /api/v1.2/auth/create
const createUser = ({ name, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //CREATE USER:
        const user = yield user_models_1.User.save({
            name,
            email,
            password
        });
        //RETURN SUCCESS RESPONSE
        return user;
    }
    catch (error) {
        console.log(error);
        //RETURN UNSUCCESSFUL RESPONSE
        return error;
    }
});
exports.createUser = createUser;
//@desc LOGIN
//@route GET /api/v1.2/auth/login
// export const loginUser = async ({email, password} : any) => {
//   try {
//     const user = await User.findOne({ where: { email } })
//     //BCRYPT DECRYPTION METHODS:
//     const isPasswordValid = await User.compare(password, user!.password)
//     if (isPasswordValid) {
//       //AUTHENTICATION METHODS REQUIRED:
//       return user
//     } else {
//       const response = {"message": "Incorrect password"}
//       return response
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

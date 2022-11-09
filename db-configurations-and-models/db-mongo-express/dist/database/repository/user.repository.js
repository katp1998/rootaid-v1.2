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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = exports.findUser = void 0;
const user_models_1 = require("../models/user.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    //CHECK IF USER EXISTS
    const userExists = (0, exports.findUser)({ email });
    if (!userExists) {
        try {
            //GENERATE THE HASHED PASSWORD TO BE STORED IN THE DATABASE:
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            //CREATE USER:
            const user = yield user_models_1.User.create({
                name,
                email,
                password: hashedPassword,
            });
            //RETURN SUCCESS RESPONSE
            const response = { "status": "success", "user": { "name": user.name, "email": user.email } };
            return response;
        }
        catch (error) {
            console.log(error);
            //RETURN UNSUCCESSFUL RESPONSE
            const response = { "status": "error", "messsage": "User creation unsuccessful" };
            return response;
        }
    }
    else {
        const response = { "message": "User exists, please login" };
        return response;
    }
});
exports.createUser = createUser;
//@desc LOGIN
//@route GET /api/v1.2/auth/login
const loginUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //CHECK IF USER EXISTS
        const userExists = (0, exports.findUser)({ email });
        if (!userExists) {
            const response = { "status": "error", "message": "User does not have an account, please Sign up" };
            return response;
        }
        const user = yield user_models_1.User.findOne({ where: { email } });
        //BCRYPT DECRYPTION METHODS:
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (isPasswordValid) {
            //AUTHENTICATION METHODS REQUIRED:
            const response = { "message": "Login successful" };
            return response;
        }
        else {
            const response = { "message": "Incorrect password" };
            return response;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginUser = loginUser;

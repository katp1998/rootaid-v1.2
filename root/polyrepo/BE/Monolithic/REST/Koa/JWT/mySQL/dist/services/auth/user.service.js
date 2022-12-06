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
exports.loginUser = exports.registerUser = void 0;
const index_1 = require("../../utils/index");
const index_2 = require("../../utils/index");
const user_repository_1 = require("../../database/repositories/user.repository");
const registerUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //CHECK IF USER EXISTS:
        const userExists = yield (0, user_repository_1.findUser)(email);
        if (!userExists) {
            let hashedPassword = yield (0, index_2.generatePassword)(password);
            //creating user in database (user.repository):
            const newUser = yield (0, user_repository_1.createUser)({
                name,
                email,
                password: hashedPassword,
            });
            const token = yield (0, index_1.generateToken)({
                email: newUser.email,
                _id: newUser._id,
            });
            //RETURNING THE TOKEN:
            return { token: token };
        }
        else {
            return { message: 'user exists, please login' };
        }
    }
    catch (error) {
        //ERRORS THROWN WHEN REGISTERING USER WAS UNSUCCESSFUL:
        console.log(error);
        return { message: 'error in registering user, thrown from user.service.ts' };
    }
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield (0, user_repository_1.findUser)(email);
        console.log(existingUser);
        if (existingUser) {
            //COMPARE PASSWORDS:
            const validatedPassword = yield (0, index_1.validatePassword)(password, existingUser.password);
            if (validatedPassword) {
                //IF THE PASSWORD IS CORRECT:
                const token = yield (0, index_1.generateToken)({
                    email: existingUser.email,
                    _id: existingUser._id,
                });
                //RETURN USER TOKEN & ID:
                return { id: existingUser._id, token };
            }
            else {
                //IF THE USER IS NOT CORRECT:
                return { error: "Incorrect Password" };
            }
        }
        else {
            //IF USER DOESNT EXIST
            return { error: " User not registered " };
        }
    }
    catch (error) {
        return error;
    }
});
exports.loginUser = loginUser;

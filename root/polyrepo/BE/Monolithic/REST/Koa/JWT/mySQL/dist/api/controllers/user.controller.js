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
exports.handleLogin = exports.handleRegister = void 0;
const user_service_1 = require("../../services/auth/user.service");
//REGISTERING USER
const handleRegister = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = ctx.request.body;
        //PASSING INTO METHOD IN USER.SERVICE
        const data = yield (0, user_service_1.registerUser)(name, email, password);
        ctx.body = {
            name: name,
            response: data,
        };
    }
    catch (error) {
        ctx.body(error);
    }
});
exports.handleRegister = handleRegister;
//LOGIN USER:
const handleLogin = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = ctx.request.body;
    try {
        //PASSING INTO METHOD IN USER.SERVICE
        const data = yield (0, user_service_1.loginUser)(email, password);
        ctx.body = {
            status: "Successful Login",
            info: data,
        };
    }
    catch (error) {
        ctx.body = {
            status: "Unsuccessful Login",
            ErrorCode: error,
        };
    }
});
exports.handleLogin = handleLogin;

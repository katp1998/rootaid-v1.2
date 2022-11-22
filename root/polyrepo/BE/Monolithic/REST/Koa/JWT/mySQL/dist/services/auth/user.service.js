'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.loginUser = exports.registerUser = void 0;
const index_1 = require('../../utils/index');
const index_2 = require('../../utils/index');
const user_repository_1 = require('../../database/repositories/user.repository');
const registerUser = (name, password, email) => __awaiter(void 0, void 0, void 0, function* () {
  try {
    const checkExistingUser = yield (0, user_repository_1.findUser)({ email }); //--> can this be used as any???
    if (!checkExistingUser) {
      let hashedPassword = yield (0, index_2.generatePassword)(password);
      const newUser = yield (0, user_repository_1.createUser)({ name, email, password: hashedPassword });
      const token = yield (0, index_1.generateToken)({ email: newUser.email, _id: newUser._id });
      return { id: newUser._id, token };
    } else {
      return { error: 'Email already registered, please login' };
    }
  } catch (error) {
  }
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
  try {
    const existingUser = yield (0, user_repository_1.findUser)({ email });
    if (existingUser) {
      const validatedPassword = yield (0, index_1.validatePassword)(password, existingUser.password);
      if (validatedPassword) {
        const token = yield (0, index_1.generateToken)({ email: existingUser.email, _id: existingUser._id });
        return { id: existingUser._id, token };
      } else {
        return { error: 'Incorrect Password' };
      }
    } else {
      return { error: ' User not registered ' };
    }
  } catch (error) {
    return error;
  }
});
exports.loginUser = loginUser;

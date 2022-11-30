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
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateRefreshToken = exports.generateToken = exports.validatePassword = exports.generatePassword = void 0;
const bcrypt_1 = __importDefault(require('bcrypt'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const generatePassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
  return bcrypt_1.default.hash(password, Number(process.env.SALT));
});
exports.generatePassword = generatePassword;
const validatePassword = (enteredPassword, savedPassword) => __awaiter(void 0, void 0, void 0, function* () {
  return bcrypt_1.default.compare(enteredPassword, savedPassword);
});
exports.validatePassword = validatePassword;
const generateToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
  return jsonwebtoken_1.default.sign(payload, `${process.env.ACCESS_TOKEN_SECRET_KEY}`, { expiresIn: '10m' });
});
exports.generateToken = generateToken;
const generateRefreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
  return jsonwebtoken_1.default.sign(payload, 'refreshkeysecret', { expiresIn: '2d' });
});
exports.generateRefreshToken = generateRefreshToken;
module.exports.FormatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error('Data Not found!');
  }
};

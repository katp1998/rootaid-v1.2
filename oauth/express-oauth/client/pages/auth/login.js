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
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const router_1 = require("next/router");
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("@hookform/resolvers/zod");
const zod_2 = require("zod");
const createSessionSchema = (0, zod_2.object)({
    email: (0, zod_2.string)().nonempty({
        message: "Email is required",
    }),
    password: (0, zod_2.string)().nonempty({
        message: "Password is required",
    }),
});
function LoginPage() {
    var _a, _b;
    const router = (0, router_1.useRouter)();
    const { loginError, setLoginError } = (0, react_1.useState)(null);
    const { register, formState: { errors }, handleSubmit, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(createSessionSchema),
    });
    function onSubmit(values) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield axios_1.default.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`, values, { withCredentials: true });
                router.push("/");
            }
            catch (e) {
                setLoginError(e.message);
            }
        });
    }
    console.log({ errors });
    return (<>
      <p>{loginError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="jane.doe@example.com" {...register("email")}/>
          <p>{(_a = errors.email) === null || _a === void 0 ? void 0 : _a.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="*********" {...register("password")}/>
          <p>{(_b = errors.password) === null || _b === void 0 ? void 0 : _b.message}</p>
        </div>

        <button type="submit">SUBMIT</button>
      </form>
    </>);
}
exports.default = LoginPage;

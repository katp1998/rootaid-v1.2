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
exports.getServerSideProps = void 0;
const swr_1 = __importDefault(require("swr"));
const Home_module_css_1 = __importDefault(require("../styles/Home.module.css"));
const fetcher_1 = __importDefault(require("../utils/fetcher"));
const getGoogleUrl_1 = __importDefault(require("../utils/getGoogleUrl"));
const Home = ({ fallbackData }) => {
    const { data } = (0, swr_1.default)(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`, fetcher_1.default, { fallbackData });
    if (data) {
        return <div>Welcome! {data.name}</div>;
    }
    return (<div className={Home_module_css_1.default.container}>
      <a href={(0, getGoogleUrl_1.default)()}>Login with Google</a>
      Please login
    </div>);
};
const getServerSideProps = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, fetcher_1.default)(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`, context.req.headers);
    return { props: { fallbackData: data } };
});
exports.getServerSideProps = getServerSideProps;
exports.default = Home;

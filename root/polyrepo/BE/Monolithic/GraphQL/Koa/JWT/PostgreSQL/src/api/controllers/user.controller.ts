import { registerUser, loginUser } from "../../services/auth/user.service";

//REGISTER REQUEST INTERFACE
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

//LOGIN REQUEST INTERFACE
interface LoginRequest {
  email: string;
  password: string;
}

//REGISTERING USER
const handleRegister = async (ctx: any) => {
  try {
    const { name, email, password } = <RegisterRequest>ctx.request.body;
    //PASSING INTO METHOD IN USER.SERVICE
    const data = await registerUser(name, email, password);
    ctx.body = {
      name: name,
      response: data,
    };
  } catch (error) {
    ctx.body(error);
  }
};

//LOGIN USER:
const handleLogin = async (ctx: any) => {
  const { email, password } = <LoginRequest>ctx.request.body;

  try {
    //PASSING INTO METHOD IN USER.SERVICE
    const data = await loginUser(email, password);
    ctx.body = {
      status: "Successful Login",
      info: data,
    };
  } catch (error) {
    ctx.body = {
      status: "Unsuccessful Login",
      ErrorCode: error,
    };
  }
};

export { handleRegister, handleLogin };

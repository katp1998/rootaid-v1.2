import { registerUser, loginUser } from '../../services/auth/user.service';

//REGISTER REQUEST INTERFACE
interface RegisterRequest {
  username: string;
  email: string;
  password: string

}

//LOGIN REQUEST INTERFACE
interface LoginRequest {
  username: string;
  password: string

}

//REGISTERING USER
const handleRegister = async (ctx: any) => {
  

  try {
    const { username, email, password } = <RegisterRequest>ctx.request.body;
    
    //PASSING INTO METHOD IN USER.SERVICE
    const data = await registerUser(username, password, email);
    return data;

    // ctx.body = `New user added: ${username},
    // email: ${email},
    // password: ${password}`;

  } catch (error) {
    return error;
  }

};

//LOGIN USER
const handleLogin = async (ctx: any) => {
  try {
    const { username, password } = <LoginRequest>ctx.request.body;

    //PASSING INTO METHOD IN USER.SERVICE
    const data = await loginUser(username, password);
    return data;

    //ctx.body = `Successful login: ${username}`;

  } catch (error) {
    return error;
  }

  
};

export { handleRegister, handleLogin };
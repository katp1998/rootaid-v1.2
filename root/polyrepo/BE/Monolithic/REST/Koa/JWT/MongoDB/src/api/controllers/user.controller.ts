import { createUser } from '../../database/repositories/user.repository';
import { registerUser, loginUser } from '../../services/auth/user.service';

//REGISTER REQUEST INTERFACE
interface RegisterRequest {
  name: string;
  email: string;
  password: string

}

//LOGIN REQUEST INTERFACE
interface LoginRequest {
  name: string;
  password: string

}

//REGISTERING USER
const handleRegister = async (ctx: any) => {
  

  try {
    const { name, email, password } = <RegisterRequest>ctx.request.body;
    
    //PASSING INTO METHOD IN USER.SERVICE
    await registerUser(name, email, password);
    ctx.body = {
      "name is": name,
      "email": email,
      "password": password
  };

  } catch (error) {
    ctx.body(error)
  }

};

//LOGIN USER
const handleLogin = async (ctx: any) => {
  try {
    const { name, password } = <LoginRequest>ctx.request.body;

    //PASSING INTO METHOD IN USER.SERVICE
    const data = await loginUser(name, password);
    return data;

    //ctx.body = `Successful login: ${username}`;

  } catch (error) {
    return error;
  }

  
};

export { handleRegister, handleLogin };
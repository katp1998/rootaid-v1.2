import { createUser, findUser } from '../../database/repositories/user.repository';
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

//FINDING USER
const handleUser = async (ctx:any) => {

  const email = ctx.request.body;
  const user = await findUser(email);
  return user;

  
};

//REGISTERING USER
const handleRegister = async (ctx: any) => {
  

  try {
    const { name, email, password } = <RegisterRequest>ctx.request.body;
  
    //CHECK IF USER EXISTS:
    const userExists = await handleUser(email);

    if (!userExists) {
      //PASSING INTO METHOD IN USER.SERVICE
      await registerUser(name, email, password);
      ctx.body = {
        'name is': name,
        'email': email,
        'password': password,
      };
    } else {

    }
    
    

  } catch (error) {
    ctx.body(error);
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
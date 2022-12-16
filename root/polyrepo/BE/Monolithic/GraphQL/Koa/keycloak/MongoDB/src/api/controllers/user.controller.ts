import { findUser } from '../../database/repositories/user.repository';
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
     const response= await registerUser(name, email, password);
    
     ctx.body = {
        'data': response
      };
            
  } catch (error) {
    console.log(error + "errorr block");
    return error;
    // ctx.body(error);
    
  }

};

//LOGIN USER
const handleLogin = async (ctx: any) => {
  try {
    const { name, password } = <LoginRequest>ctx.request.body;

    //PASSING INTO METHOD IN USER.SERVICE
    const data = await loginUser(name, password);
    console.log(data);

    ctx.body = {
      'data': data
    };
   

    //ctx.body = `Successful login: ${username}`;

  } catch (error) {
    console.log(error);
    return error;
    
  }
  };
  

export { handleRegister, handleLogin};
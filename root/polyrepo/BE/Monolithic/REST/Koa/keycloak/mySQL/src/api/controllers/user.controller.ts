import { logIn, logOut, signUp, verifyRefreshToken } from '../../services/auth/user.service';

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
const registerUser = async (ctx: any) => {
  

  try {
    const { name, email, password } = <RegisterRequest>ctx.request.body;
   
      //PASSING INTO METHOD IN USER.SERVICE
     const response= await signUp(name, email, password);
    
     ctx.body = {
        'data': response
      };
            
  } catch (error) {
    console.log(error );
    ctx.body = error.message;
    
  }
};

//LOGIN USER
const loginUser = async (ctx: any) => {
  try {
    const { name, password } = <LoginRequest>ctx.request.body;

    //PASSING INTO METHOD IN USER.SERVICE
    const data = await logIn(name, password);
    console.log(data);
    ctx.cookies.set('jwt',data?.refresh_token,{ httpOnly: true})
    ctx.body = {
      'id': data.id,
      'name':data.name,
      'accessToken': data.access_token
    };

  } catch (error) {
    console.log(error);
    ctx.body = error.message;
  }
};

//Get access token

const refreshToken = async (ctx: any) =>
{

  const refreshtoken = ctx.cookies.get('jwt');

  if (!refreshtoken)
  {
    ctx.status = 204;
    ctx.body={ message : "Refresh token not found"}
  }
  else
  {
    const data = await verifyRefreshToken(refreshtoken);

    const accessToken = data.access_token;
  
    ctx.body = {
      'accessToken': accessToken
    };

  }
}

//logout user

const logoutUser = async(ctx: any) =>
{
  try{
  const refreshtoken = ctx.cookies.get('jwt');

  if (!refreshtoken) {
    ctx.status = 204;
    ctx.body = { message: "Refresh token not found" };
    }
  else {
    
    await logOut(refreshtoken);

    await ctx.cookies.set('jwt','');
  
      // ctx.throw(200, 'user logout');
    ctx.body = { message: "Logged Out Successfully" }
    
    }


 
    
  }
  catch (error)
  {
    console.log(error);
    ctx.body = error.message;
  }

}
 
export {
  loginUser,
  registerUser,
  refreshToken,
  logoutUser
};
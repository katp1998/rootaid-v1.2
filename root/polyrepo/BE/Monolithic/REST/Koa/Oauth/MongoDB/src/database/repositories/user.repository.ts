//koa was not used in this process
import { User } from '../models/user.model';

//@DESC: FIND IF USER EXISTS
//@ROUTE: POST 
export const findUser = async (email: any) =>{
  try {
    const existingUser = await User.findOneBy({email});
    return existingUser;
  } catch (error) {
    console.log(error, 'from user.repository');
  }
};

//@desc CREATING USER
//@route POST 
export const createUser = async ({ name, email, password }: { name: string, email: string, password: string }) =>{
  try {
    //CREATE USER:
    const user = await User.save({
      name,
      email,
      password,
    });
    return user;
  } catch (error) {
    return error;
  }
};
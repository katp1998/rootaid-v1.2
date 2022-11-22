//koa was not used in this process
import { User } from '../models/user.model';

//@DESC: FIND IF USER EXISTS
//@ROUTE: POST /api/v1.2/auth/
export const findUser = async (email: string) =>{
  try {
    const existingUser = await User.findOne({ where: { email } });
    return existingUser;
  } catch (error) {
        
  }
};

//@desc CREATING USER
//@route POST /api/v1.2/auth/create
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
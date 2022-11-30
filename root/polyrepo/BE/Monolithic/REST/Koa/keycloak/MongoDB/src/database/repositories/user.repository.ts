//koa was not used in this process
import { User } from '../models/user.model';

// find user by email
export const findUser = async (email: any) => {
  try {
    const existingUser = await User.findOne({ where: { email } });

    return existingUser;

  } catch (error) {
    console.log(error, 'from user.repository');
  }
};

// find user by email
export const findUserByUsername = async (name: any) => {
  try {
    const existingUser = await User.findOne({ where: { name } });

    return existingUser;

  } catch (error) {
    console.log(error, 'from user.repository');
  }
};

// create user
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
import { generateToken, validatePassword } from "../../utils/index";
import { generatePassword } from "../../utils/index";
import {
  findUser,
  createUser,
} from "../../database/repositories/user.repository";

const registerUser = async (name: string, email: string, password: string) => {
  try {
    //CHECK IF USER EXISTS:
    const userExists = await findUser(email);

    if (!userExists) {
      let hashedPassword = await generatePassword(password);

      //creating user in database (user.repository):
      const newUser = await createUser({
        name,
        email,
        password: hashedPassword,
      });

      const token = await generateToken({
        email: newUser.email,
        _id: newUser._id,
      });

      //RETURNING THE TOKEN:
      return {token: token};
    } else{
      return {message: 'user exists, please login'}
    }
  } catch (error) {
    //ERRORS THROWN WHEN REGISTERING USER WAS UNSUCCESSFUL:
    console.log(error);
    return {message: 'error in registering user, thrown from user.service.ts'};
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    const existingUser = await findUser( email );
    console.log(existingUser);

    if (existingUser) {
      //COMPARE PASSWORDS:
      const validatedPassword = await validatePassword(
        password,
        existingUser.password
      );
      
      if (validatedPassword) {
        //IF THE PASSWORD IS CORRECT:
        const token = await generateToken({
          email: existingUser.email,
          _id: existingUser._id,
        });
        //RETURN USER TOKEN & ID:
        return { id: existingUser._id, token };

      } else {
        //IF THE USER IS NOT CORRECT:
        return { error: "Incorrect Password" };
      }
    } else {
      //IF USER DOESNT EXIST
      return { error: " User not registered " };
    }
  } catch (error) {
    return error;
  }
};

export { registerUser, loginUser };

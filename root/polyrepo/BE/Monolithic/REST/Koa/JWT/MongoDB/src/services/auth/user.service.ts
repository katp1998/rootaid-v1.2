import { generateToken, validatePassword } from '../../utils/index';
import { generatePassword } from '../../utils/index';
import { findUser, createUser } from '../../database/repositories/user.repository';

const registerUser = async (name: string, password: string, email: string) => {
  try {
    let hashedPassword = await generatePassword(password);

    //creating user in database (user.repository):
    const newUser = await createUser({ name, email, password:hashedPassword });
        
    const token = await generateToken({ email: newUser.email, _id: newUser._id });

    //
    return (`created new user ${newUser.name} email address: ${newUser.email}, with token: ${token}` );
     
  } catch (error) {
    console.log(error);
    return ('error in registering user, thrown from user.service.ts');
  }
};

const loginUser = async (email: string, password: string) => {

  try {
    const existingUser = await findUser({ email } as any);

    if (existingUser) {
      const  validatedPassword = await validatePassword(password, existingUser.password);

      if (validatedPassword) {
        const token = await generateToken({ email : existingUser.email, _id:existingUser._id });   
        return { id: existingUser._id,  token };

      } else {
        return { error: 'Incorrect Password' };

      }
    } else {
      return { error: ' User not registered ' };

    }
  } catch (error) {
    return error;
  }
  
};

export { registerUser, loginUser };
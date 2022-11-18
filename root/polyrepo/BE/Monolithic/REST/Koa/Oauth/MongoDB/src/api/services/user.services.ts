import { findUser, createUser } from '../../database/repositories/user.repository';

const registerUser = async (name: string, password: string, email: string) => {
  try {
    const checkExistingUser = await findUser({ email } as any); //--> can this be used as any???

    if (!checkExistingUser) { 
    //   let hashedPassword = await generatePassword(password);

      const newUser : any = await createUser({ name, email, password:hashedPassword });
        
    //   const token = await generateToken({ email: newUser.email, _id: newUser._id });

      //return { id:newUser._id, token };

    } else {

      return { error : 'Email already registered, please login' };
    }
  } catch (error) {
        
  }
};

const loginUser = async (email: string, password: string) => {

  try {
    const existingUser = await findUser({ email } as any);

    if (existingUser) {
    //   const  validatedPassword = await validatePassword(password, existingUser.password);

    //   if (validatedPassword) {
    //     const token = await generateToken({ email : existingUser.email, _id:existingUser._id });   
    //     return { id: existingUser._id,  token };

    //   } else {
    //     return { error: 'Incorrect Password' };

      }
    } else {
      return { error: ' User not registered ' };

    }
  } catch (error) {
    return error;
  }
  
};

export { registerUser, loginUser };
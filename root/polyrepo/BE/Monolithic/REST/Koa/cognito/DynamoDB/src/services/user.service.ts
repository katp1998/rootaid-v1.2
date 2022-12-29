
import { generateToken, validatePassword, generateRefreshToken } from '../../utils/index';
import { generatePassword } from '../../utils/index';
import { findUser, createUser, saveRefreshToken,findUserByToken,findUserById,removeRefreshToken } from '../database/repositories/user.repository';

export interface RegisterInputs {
  username:string,
  email:string,
  password:string
}

export interface LoginInputs {    
  username:string,
  password:string
}

export const registerUser = async (userInputs : RegisterInputs) => {

   const { username ,email ,password} = userInputs
    try {

    const checkExistingUser = await findUser(email)

    if(!checkExistingUser){

      let hashedPassword = await generatePassword(password)

      const newUser : any = await createUser({username,email,password:hashedPassword})

      return {id:newUser._id,name:newUser.name}

    } else {
      throw new Error("Email Already Registered")
    }   
  } catch (error : any) {
    console.log(error);
    throw new Error(error.message)
  }
};

 export const loginUser = async (userInputs : LoginInputs) => {
  const {username, password} = userInputs
  try {
    const existingUser = await findUser(username)

    if (existingUser) {
        const  validatedPassword = await validatePassword(password, existingUser.password)

        if(validatedPassword){
                await saveRefreshToken(existingUser._id,refreshToken)

                return {id: existingUser._id,name:existingUser.name,  accessToken,refreshToken }
        }else {
            throw new Error("Incorrect Password")
        }
    }else {
        throw new Error("User not found")
    }
} catch (error:any) {
    throw new Error(error.message)
}
};

export const userFind = async (refreshToken:string) => {
  try {
      const user = await findUserByToken(refreshToken)
      return user
  } catch (error:any) {
      throw new Error(error.message)
  }
}

export const logout =async (refreshToken : string) => {

   await removeRefreshToken(refreshToken)
}

export const userFindByID = async (userID : string) => {
  try {
    const user = await findUserById(userID)
    return user
} catch (error:any) {
    throw new Error(error.message)
}
}
import { generateToken, validatePassword, generateRefreshToken } from '../../utils/index';
import { generatePassword } from '../../utils/index';
import { v4 as uuidv4 } from 'uuid';
import { findUser, createUser, saveRefreshToken,findUserByToken,findUserById,removeRefreshToken } from '../../database/repository/user.repository';

export interface RegisterInputs {
  name:string,
  email:string,
  password:string
}

export interface LoginInputs {    
  email:string,
  password:string
}

export const registerUser = async (userInputs : RegisterInputs) => {

   const { name ,email ,password} = userInputs
   const id = uuidv4()
    try {

    const checkExistingUser : any = await findUser(email)

    if(!checkExistingUser[0]){

      let hashedPassword = await generatePassword(password)

      const newUser : any = await createUser({id ,name,email,password:hashedPassword})
      
      const accessToken = await generateToken({email: newUser.email, id: newUser.id})

      const refreshToken = await generateRefreshToken({name: newUser.name})

       await saveRefreshToken(newUser._id,refreshToken,)

      return {id:newUser.id, accessToken,name:newUser.name,refreshToken}

    } else {
      throw new Error("Email Already Registered")
    }   
  } catch (error : any) {
    console.log(error);
    throw new Error(error.message)
  }
};

 export const loginUser = async (userInputs : LoginInputs) => {
  const {email, password} = userInputs
  try {
    const existingUser  :any = await findUser(email)

    if (existingUser[0]) {
        const  validatedPassword = await validatePassword(password, existingUser[0].password)

        if(validatedPassword){
                const accessToken = await generateToken({email : existingUser[0].email, id:existingUser[0].id})   
                const refreshToken = await generateRefreshToken({name:existingUser[0].name})
                await saveRefreshToken(existingUser[0].id,refreshToken)

                return {id: existingUser[0].id,name:existingUser[0].name,  accessToken,refreshToken }
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

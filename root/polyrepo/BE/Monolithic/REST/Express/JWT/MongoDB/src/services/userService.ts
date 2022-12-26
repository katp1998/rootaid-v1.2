import  {findUser,createUser, findUserById, findUserByToken , saveRefreshToken, removeRefreshToken} from '../../database/repository/user.repository'
import { generatePassword, generateRefreshToken, generateToken, validatePassword } from '../utils/index'

export interface RegisterInputs {
    name:string,
    email:string,
    password:string
  }
  
  export interface LoginInputs {    
    email:string,
    password:string
  }

export const signUp = async (userInputs: RegisterInputs) => {
    const { name,email, password} = userInputs

    try {
        
         const checkExistingUser = await findUser(email)
         

        if(!checkExistingUser){ 
            
            
            let hashedPassword = await generatePassword(password)

            const newUser : any = await createUser({name,email,password:hashedPassword})
            
            const accessToken = await generateToken({email: newUser.email, _id: newUser._id})

            const refreshToken = await generateRefreshToken({name: newUser.name})

            await saveRefreshToken(newUser._id,refreshToken,)

            return {id:newUser._id, accessToken,name:newUser.name,refreshToken}

        } else {
            throw new Error("Email Already Registered")
        }
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const logIn = async (userInputs : LoginInputs) =>{

    const {email,password} = userInputs

    try {
        const existingUser = await findUser(email)

        if (existingUser) {
            const  validatedPassword = await validatePassword(password, existingUser.password)

            if(validatedPassword){
                    const accessToken = await generateToken({email : existingUser.email, _id:existingUser._id})   
                    const refreshToken = await generateRefreshToken({name:existingUser.name})

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
}

export const logout =async (refreshToken : string) => {
    
    await removeRefreshToken(refreshToken)

}

export const userFind = async (refreshToken:string) => {
    try {
        const user = await findUserByToken(refreshToken)
        return user
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const userFindByID = async (userID : string) => {
    try {
        const user = await findUserById(userID)
        return user
    } catch (error:any) {
        throw new Error(error.message)
    }
}    


import  {findUser,createUser, findUserById} from '../../database/repository/user.repository'
import { generatePassword, generateToken, validatePassword } from '../utils/index'
export const signUp = async (userInputs: any) => {
    const { name,email, password} = userInputs

    try {
        
         const checkExistingUser = await findUser({email})
         

        if(!checkExistingUser){ 
            
            
            let hashedPassword = await generatePassword(password)

            const newUser : any = await createUser({name,email,password:hashedPassword})
            
            const token = await generateToken({email: newUser.email, _id: newUser._id})

            return {id:newUser._id, token}

        } else {
            throw new Error("Email Already Registered")
        }
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const logIn = async (userInputs : any) =>{

    const {email,password} = userInputs

    try {
        const existingUser = await findUser({email})

        if (existingUser) {
            const  validatedPassword = await validatePassword(password, existingUser.password)

            if(validatedPassword){
                    const token = await generateToken({email : existingUser.email, _id:existingUser._id})   
                    return {id: existingUser._id,name:existingUser.name,  token}
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

export const userFind = async (id : any) => {
    try {
        const user = await findUserById({id})
        return user
    } catch (error) {
        return({error})
    }
}

const {findUser,createUser, findUserById}= require('../../database/repository/user.repository')
const { FormateData, generatePassword, generateToken, validatePassword } = require('../utils/index');

//signup
export const signUp = async (userInputs: any) => {
    const { name,email, password} = userInputs

    try {
        
         const checkExistingUser = await findUser({email})
         

        if(!checkExistingUser){ 
            
            
            //let hashedPassword = await generatePassword(password)
            //console.log("1zz")
            const newUser = await createUser({name,email,password})
            
            //const token = await generateToken({email: newUser.email, _id: newUser._id})

            return {newUser}

        } else {

            return {err : "Email already registered"}
        }
        
    } catch (error) {
        return {error : error}
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
                    return {id: existingUser._id,  token}
            }else {
                return {err: "Incorrect Password"}
            }



        }else {
            return {err: " User not found "}
        }
    } catch (error) {
        return {error: error}
    }

}

export const userFind = async (id : any) => {
    try {
        const user = await findUserById({id})
        return user
    } catch (error) {
        
    }
}
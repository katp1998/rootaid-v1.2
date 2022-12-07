import  {findUser,createUser} from '../database/repository/user.repository'

//getting cognito identity:



//Registering user:
export const signUp = async (userInputs: any) => {
    const { name,email, password} = userInputs

    try {
        //check if user exists:
         const checkExistingUser = await findUser(email)
         
        //if no user:
        if(!checkExistingUser){ 
            //add hashed password:
            const hashedPassword = await 

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
        const existingUser = await findUser(email)

        if (existingUser) {



        }else {
            throw new Error("User not found")
        }
    } catch (error:any) {
        throw new Error(error.message)
    }

}


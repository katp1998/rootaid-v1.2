import userModel from '../models/user.models'
import { IUserInputs} from '../types/user.type'

// Save user
export const  createUser  = async ({name,email,password} : IUserInputs) =>{
        try {
            const user = new userModel({
                name,
                email,
                password
            })
            
            const userResult = await user.save()

            return userResult


        }
        catch (error)
        {
            console.log(error); 
            return error
        }
    }

// find user by email
 export const  findUserByEmail =async ({email} : any)=>{
        try {
            const existingUser = await userModel.findOne({ email: email });
            return existingUser;
        }
        catch (error)
        {
            console.log(error); 
        }
}

// find user by username
export const  findUserByUsername =async ({name} : any)=>{
    try {
        const existingUser = await userModel.findOne({ name: name });
        return existingUser;
    }
    catch (error)
    {
        console.log(error); 
    }
}

// find user by refreshtoken
export const findUserByToken = async (refreshToken : any)   =>{
    try {
        const existingUser = await userModel.findOne({ refreshToken: refreshToken });
        return existingUser;
    }
    catch (error)
    {
        console.log(error); 

    }
} 

// save rfersh token
export const saveRefreshToken =async (userID: string , refreshToken :string) => {
    
    const user = await userModel.findById(userID).findOneAndUpdate({refreshToken:refreshToken})

    const result = await user?.save();
    //  console.log(result)
    

}

// find user by id
export const  findUserById = async (id : string) =>{
        try {
            const existingUser = await userModel.findById(id).select('-password').select('-refreshToken')
            console.log({existingUser})

            return existingUser

        }
        catch (error) {
            console.log(error);
        }
}
    
// remove refresh token from db
export const removeRefreshToken =async (refreshToken : string) => {
    try {
        const user = await findUserByToken(refreshToken)   
        if(user) {
            user.refreshToken = '';
            const result = await user.save();
            console.log(result);
        }
    }
    catch (error) {
        console.log(error);
    }
}
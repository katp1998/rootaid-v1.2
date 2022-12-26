import { DocumentDefinition } from 'mongoose'
import userModel from '../models/user.model'
import {IUser, IUserInputs} from '../types/user.type'


export const  createUser  = async ({name,email,password} : IUserInputs) =>{
        try {
            const user = new userModel({
                name,
                email,
                password
            })
            
            const userResult = await user.save()

            return userResult


        } catch (error) {
            return error
        }
    }

 export const  findUser =async (email : any)=>{
        try {
            const existingUser = await userModel.findOne({email : email})
            return existingUser
        } catch (error) {
            
        }
    }

export const findUserByToken = async (refreshToken : any)   =>{
    try {
        const existingUser = await userModel.findOne({refreshToken:refreshToken})
        return existingUser
    } catch (error) {
        
    }
} 

export const saveRefreshToken =async (userID: string , refreshToken :string) => {
    
    const user = await userModel.findById(userID).findOneAndUpdate({refreshToken:refreshToken})

    const result = await user?.save();
    //  console.log(result)
    

}

export const  findUserById = async (id : string) =>{
        try {
            const existingUser = await userModel.findById(id).select('-password').select('-refreshToken')
            console.log({existingUser})

            return existingUser

        } catch (error) {
            return {
                error: "error"
            }
        }
    }

export const removeRefreshToken =async (refreshToken : string) => {
    try {
        const user = await findUserByToken(refreshToken)   
        if(user) {
            user.refreshToken = ''
            const result = await user.save();
            console.log(result)
        }

        

    } catch (error) {
        
    }
}
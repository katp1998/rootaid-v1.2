import { DocumentDefinition } from 'mongoose'
import userModel from '../models/user.model'
import {IUser} from '../types/user.type'


export const     createUser  = async ({name,email,password} : any ) =>{
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

 export const  findUser =async ({email} : any)=>{
        try {
            const existingUser = await userModel.findOne({email : email})
            return existingUser
        } catch (error) {
            
        }
    }

export const  findUserById = async ({id} : any) =>{
        try {
            const existingUser = await userModel.findById(id).select('-password')


            return existingUser

        } catch (error) {
            return {
                error: "error"
            }
        }
    }


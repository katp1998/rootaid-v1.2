import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../models/user.model'
import { CreateUserDto, SaveRefreshTokenDto } from "../dto";

@Injectable()
export class UserRepository {
    constructor(
         @InjectModel(User.name) private readonly model: Model<UserDocument>,
    ) {}

    async findUser(username: string): Promise<User> {
        const result = await this.model.findOne({ username: "yicete" })
        console.log(result)
        return result
    }

    async findUserByToken(refreshToken: string): Promise<User> {
        return await this.model.findOne({ refreshToken: refreshToken }).exec()
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await new this.model({
            ...createUserDto
        }).save()
    }
    

    async saveRefreshToken(id: string, saveRefreshTokenDto: SaveRefreshTokenDto): Promise<User> {
        const { refreshToken } = saveRefreshTokenDto
        return await this.model.findByIdAndUpdate(id, {refreshToken: refreshToken}).exec();
    }

    async removeRefreshToken(id: string) { 
        const updatedUser = await this.model.findByIdAndUpdate(id, {refreshToken: ""}).exec();
        return `Refresh token has been destroyed.
        ${updatedUser}
        `
    }

}

// export const  createUser  = async ({name,email,password} : IUserInputs) => {
//         try {
//             const user = new ({
//                 name,
//                 email,
//                 password
//             })
            
//             const userResult = await user.save()

//             return userResult


//         } catch (error) {
//             return error
//         }
//     }

//  export const  findUser = async (email : any)=>{
//         try {
//             const existingUser = await userModel.findOne({email : email})
//             return existingUser
//         } catch (error) {
            
//         }
//     }

// export const findUserByToken = async (refreshToken : any)   =>{
//     try {
//         const existingUser = await userModel.findOne({refreshToken:refreshToken})
//         return existingUser
//     } catch (error) {
        
//     }
// } 

// export const saveRefreshToken =async (userID: string , refreshToken :string) => {
    
//     const user = await userModel.findById(userID).findOneAndUpdate({refreshToken:refreshToken})

//     const result = await user?.save();
//     //  console.log(result)
    

// }

// export const  findUserById = async (id : string) =>{
//         try {
//             const existingUser = await userModel.findById(id).select('-password').select('-refreshToken')
//             console.log({existingUser})

//             return existingUser

//         } catch (error) {
//             return {
//                 error: "error"
//             }
//         }
//     }

// export const removeRefreshToken =async (refreshToken : string) => {
//     try {
//         const user = await findUserByToken(refreshToken)   
//         if(user) {
//             user.refreshToken = ''
//             const result = await user.save();
//             console.log(result)
//         }

        

//     } catch (error) {
//         console.log(error)
//     }
// }
  
 
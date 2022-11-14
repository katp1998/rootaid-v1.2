import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'database/models/user.schema';
import { Model } from 'mongoose';
import { encodePassword } from 'src/utils/bcrypt';
import { userCreatedto } from './dto/userCreate.dto';

@Injectable()
    
export class UserService {

    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserDocument>
    ) { }

     // register User

    async register(createUserDTO: userCreatedto) {
        const existingUser = await this.findUserByEmail(createUserDTO.email);

        if (!existingUser)
        {
            const password = await encodePassword(createUserDTO.password);
            const newUser = new this.userModel({ ...createUserDTO, password });
            const registeredUser = newUser.save();
            return {
                user: registeredUser,
                message:"Sucessfully Created"
            }
            
        }
        return {
            user:null,
            message: "Already email registered"  
        }

    }
    
     // get by email id

     findUserByEmail(email: string)
     {
         return this.userModel.findOne(
             {
             email
             }
         );
     }  

}

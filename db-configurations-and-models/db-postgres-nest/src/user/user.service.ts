import { Injectable } from '@nestjs/common';
import { userCreatedto } from './dto/userCreate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'database/models/user.entity';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
    
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepositary: Repository<User>
    ) { }

    // register User

    async register(userCreateDTO: userCreatedto)
    {

        const existingUser = await this.getUserByEmail(userCreateDTO.email);

        if (!existingUser)
        {

            const password = await encodePassword(userCreateDTO.password);
            
            const newUser = this.userRepositary.save({ ...userCreateDTO, password });
            
            return{
                user: newUser,
                message:"Sucessfully Registered"
             }
            
        }
    
        return {
            user:null,
            message: "Already email registered"  
        }
    
    }

     // find user by email
    
     getUserByEmail(email: string)
     {
         return this.userRepositary.findOne({ where: { email } });
     }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/database/models/user.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { userCreatedto } from './dto/createUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepositary: Repository<User>
    ) { }

    googleLogin(req: any) {
        if (!req.user) {
          return 'No user from google';
        }
        
        return {
          message: 'User information from google',
          user: req.user,
        };
    }
    
    //VALIDATE AND REGISTER USER IF USER NOT IN DB:
    async validateUser(createUserdto : userCreatedto) {

        const user = await this.findUserByemail(createUserdto.email);

        if (!user)
        {
            const newUser = this.userRepositary.save(createUserdto);
            
            return newUser;
        }
        else
        {
            console.log('user logged in');
            return user;
        }
    }
    
    //To find user by id:

    async findUserById(id: number)
    {
        return this.userRepositary.findOne({ where: { id } });
    }

    // Find by email

    async findUserByemail(email: string)
    {
        return this.userRepositary.findOne({ where: { email } });
    }
    
}

import { Injectable } from '@nestjs/common';
import { User } from 'src/database/models/user.schema';
import { userCreatedto } from './dto/createUser.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {

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
            const newUser = await User.create({ "userid": uuid(), "name": createUserdto.name, "email": createUserdto.email });
            
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
        return User.scan('userid').contains(id).exec();
    }

    // Find by email

    async findUserByemail(email: string)
    {
        return User.scan('email').contains(email).exec();
    }
    
}

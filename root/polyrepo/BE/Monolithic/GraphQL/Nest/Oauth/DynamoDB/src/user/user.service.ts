import {
    Injectable,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { User } from 'src/database/models/user.schema';
import { CreateUserInput } from './inputs/user.input';
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
    async validateUser(details: CreateUserInput) {

        const user = await this.findUserByemail(details.email);

        if (user.count == 0 )
        {
            const newUser = await User.create({ "userid": uuid(), "name": details.name, "email": details.email });
            
            return newUser;
        }
        else
        {
            console.log('user logged in');
            return user;
        }
    }
    
    //To find user by id:

    async findUserById(id: string)
    {
        try {
            return User.scan('userid').contains(id).exec();
        }
        catch (error)
        {
            console.log(error);
        }
        
    }

    // Find by email

    async findUserByemail(email: string)
    {
        return User.scan('email').contains(email).exec();
    }
    

    // sample create user
    
    async registerUser(createUserInput: CreateUserInput) {
        try
        {
            return {
                message: "User created",
                user: createUserInput
            }
        }
        catch (error)
        {
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                message: 'User not created',
                error: error
            }, HttpStatus.NOT_ACCEPTABLE);
        }  
    }
}

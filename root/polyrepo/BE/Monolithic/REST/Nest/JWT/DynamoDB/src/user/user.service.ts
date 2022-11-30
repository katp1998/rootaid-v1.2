import {
    Injectable,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { User } from 'database/models/user.schema';
import { encodePassword } from 'src/utils/bcrypt';
import { userCreatedto } from './dto/userCreate.dto';
import { v4 as uuid } from 'uuid';
import { compare } from 'bcrypt';
import { logindto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {

    constructor(
        private jwtService : JwtService
    ) { }

    // register
    async register(userCreateDTO: userCreatedto) {
        const {
            email,
            password,
            name
        } = userCreateDTO;

        const existingUser = await this.getUserByEmail(email);

        if (existingUser.count == 0)
        {
            const hashedPassword = await encodePassword(password);
            try {
            
                const newUser = await User.create({ "userid": uuid(), "name": name, "email": email, "password": hashedPassword });

                throw new HttpException({
                    status: HttpStatus.CREATED,
                    message: 'Sucessfully created',
                    user: newUser
                }, HttpStatus.CREATED);
                
            }
            catch (error) {
                throw new HttpException({
                    status: HttpStatus.NOT_ACCEPTABLE,
                    error: error
                }, HttpStatus.NOT_ACCEPTABLE);
            }
        }

        throw new HttpException({
            status: HttpStatus.NOT_ACCEPTABLE,
            message: 'Already email registered'
        }, HttpStatus.NOT_ACCEPTABLE);
    
    }

    // Login 

    async validateUser(loginDTO: logindto)
    {
        const loggeduser = await this.getUserByEmail(loginDTO.email);

         if (loggeduser.count != 0 )
         {
             const {
                 email,
                 name,
                 userid,
                 password } = loggeduser[0];
             
            const isMatch = await compare(loginDTO.password, password);

            if (isMatch)
            {
                const payload = { email: email, id: userid, name:name };
                const token = this.jwtService.sign(payload);

                throw new HttpException({
                    status: HttpStatus.ACCEPTED,
                    message: 'Sucessfully Logged In',
                    user:loggeduser[0] ,
                    access_token: token
                }, HttpStatus.ACCEPTED);
            }

            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                message: 'Incorrect password',
                user: null
            }, HttpStatus.UNAUTHORIZED);
            
        }
        throw new HttpException({
            status: HttpStatus.NOT_ACCEPTABLE,
            message: 'User not exists',
            user: loggeduser
        }, HttpStatus.NOT_ACCEPTABLE);
    }

     // find user by email
    
     getUserByEmail(email: string)
     {
         try {
            return  User.scan('email').contains(email).exec();
         }
         catch (error)
         {
             console.log(error)
         }
       
     }
}

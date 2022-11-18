import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDocument } from 'databases/models/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { userCreatedto } from './dto/user.create.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { logindto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserDocument>,
        private jwtService : JwtService
    ) { }


     // register User

     async register(createUserDTO: userCreatedto) {
        const existingUser = await this.findUserByEmail(createUserDTO.email);

        if (!existingUser)
        {
            const password = await encodePassword(createUserDTO.password);
            const newUser = new this.userModel({ ...createUserDTO, password });
            const registeredUser = newUser.save();

            throw new HttpException({
                status: HttpStatus.CREATED,
                message: 'Sucessfully created'
              }, HttpStatus.CREATED)
            
        }

        throw new HttpException({
            status: HttpStatus.NOT_ACCEPTABLE,
            message: 'Already email registered'
          }, HttpStatus.NOT_ACCEPTABLE)

     }
    
    // Validate user

    async validateUser(loginDTO: logindto) {
        const user = await this.findUserByEmail(loginDTO.email);

        if (user)
        {
            const isMatch = await compare(loginDTO.password, user.password);

            if (isMatch)
            {
                const payload = { email: user.email, id: user.id, name:user.name };
                const token = this.jwtService.sign(payload);
                
              throw new HttpException({
                    status: HttpStatus.ACCEPTED,
                    message: 'Sucessfully Logged In',
                  user: user,
                  access_token: token,
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
            user: null
        }, HttpStatus.NOT_ACCEPTABLE);

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

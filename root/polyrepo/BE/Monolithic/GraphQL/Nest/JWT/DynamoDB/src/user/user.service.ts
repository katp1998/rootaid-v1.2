import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encodePassword } from 'src/utils/bcrypt';
import { CreateUserInput } from './inputs/user.input';
import { v4 as uuid } from 'uuid';
import { User } from 'database/models/user.schema';
import { LoginUserInput } from './inputs/auth.input';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private jwtService: JwtService
    ) { }

        // Create user
    
    async registerUser(createUserInput: CreateUserInput) {
        
        const { name, email, password } = createUserInput;
        const existingUser = await this.getUserByEmail(email);
        if (existingUser.count == 0)
        {

            const hashpassword = await encodePassword(createUserInput.password);
            const newUser = await User.create({ "userid": uuid(), "name": name, "email": email, "password": hashpassword });
            
            return newUser;
            
        }
        throw new HttpException({
            status: HttpStatus.NOT_ACCEPTABLE,
            message: 'Already email registered'
        }, HttpStatus.NOT_ACCEPTABLE);
    }

    // validate user

async validateUser(loginUserInput: LoginUserInput) {
    const user = await this.getUserByEmail(loginUserInput.email);

    if (user.count != 0)
    {
        const { userid, name, email, password } = user[0];
        const isMatch = await compare(loginUserInput.password, password);

        if (isMatch)
        {
            const payload = { email: email, id: userid, name: name };
            const token = this.jwtService.sign(payload);

            return {
                access_token:token
            };
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

  // find user by email
  getUserByEmail(email: string)
  {
      return User.scan('email').contains(email).exec();
      
  }

}

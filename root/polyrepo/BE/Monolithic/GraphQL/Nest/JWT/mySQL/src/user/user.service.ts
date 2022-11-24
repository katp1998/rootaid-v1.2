import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'database/models/user.schema';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { LoginUserInput } from './inputs/auth.inputs';
import { CreateUserInput } from './inputs/user.input';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepositary: Repository<User>,
        private jwtService: JwtService
    ) { }

// Create user
    
async registerUser(createUserInput: CreateUserInput) {
    const existingUser = await this.getUserByEmail(createUserInput.email);

    if (!existingUser)
    {

        const password = await encodePassword(createUserInput.password);
        const newUser = this.userRepositary.save({ ...createUserInput, password });
        
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

    if (user)
    {
        const isMatch = await compare(loginUserInput.password, user.password);

        if (isMatch)
        {
            const payload = { email: user.email, id: user.id, name: user.name };
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
      return this.userRepositary.findOne({ where: { email } });
  }


}

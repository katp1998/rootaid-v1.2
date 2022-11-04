import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { LoginUserInput } from 'src/user/inputs/auth.input';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserInput } from './inputs/user.input';
import { User } from './models/user.schema';

@Injectable()
    
export class UserService {

    constructor(
        @InjectRepository(User) 
        private userRepositary: Repository<User>,
        private jwtService: JwtService
    ) { }


    getallUser() {
        return this.userRepositary.find();
    }

// Create user
    
   async registerUser(createUserInput: CreateUserInput) {
        const existingUser = await this.getUserByEmail(createUserInput.email);

        if (!existingUser)
        {

            const password = await encodePassword(createUserInput.password);
            const newUser = this.userRepositary.save({ ...createUserInput, password });
            
            return newUser;
            
        }
       return null;
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

            return "Incorrect password";
            
        }
      
         return "User not exists";

    }

      // find user by email
      getUserByEmail(email: string)
      {
          return this.userRepositary.findOne({ where: { email } });
      }
}

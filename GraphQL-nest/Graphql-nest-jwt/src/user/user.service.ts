import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserInput } from './user.input';
import { User } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) 
    private userRepositary: Repository<User>) { }


    getallUser() {
        return this.userRepositary.find();
    }


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

      // find user by email
      getUserByEmail(email: string)
      {
          return this.userRepositary.findOne({ where: { email } });
      }
}

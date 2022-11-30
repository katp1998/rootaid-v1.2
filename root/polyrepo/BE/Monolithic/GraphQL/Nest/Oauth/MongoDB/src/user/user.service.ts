import {
  Injectable,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './inputs/user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
    
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
  async validateUser(details: CreateUserInput) {

    const user = await this.findUserByEmail(details.email);

    if (!user)
    {
      return this.userRepository.save(details);
    }
    else
    {
      console.log('user logged in');
    }

  }

  //To find user by id:
  async findUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

   //To find user by email:
   async findUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  // sample create user
    
  async registerUser(createUserInput: CreateUserInput) {
    try {
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
        error:error
      }, HttpStatus.NOT_ACCEPTABLE);
    
    }
  }
  
}


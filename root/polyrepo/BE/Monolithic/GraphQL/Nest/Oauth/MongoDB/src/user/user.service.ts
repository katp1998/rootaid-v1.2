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

    const user = await this.userRepository.findOneBy({ email: details.email });

    if (!user)
    {
      const newUser = this.userRepository.create(details);
      return this.userRepository.save(newUser);
    }
    else
    {
      console.log('user logged in');
    }

  }

  //To find user:
  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }


  // sample create user
  // Create user
    
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


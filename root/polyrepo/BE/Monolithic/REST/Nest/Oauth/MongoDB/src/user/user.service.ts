import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/models/user.model';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class userService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUser(email: any) {
    //Finding user from database
    const user = await this.userRepository.findUserByEmail({ email });
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  //CREATE USER:
  async createUser(details: UserDetails) {
    const user = await this.userRepository.save(details);
    //return user;
  }
}

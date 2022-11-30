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

  //VALIDATE AND REGISTER USER IF USER NOT IN DB:
  async validateUser(details: UserDetails) {
    console.log('UserService');
    console.log(details);
    const user = await this.userRepository.findOneBy({ email: details.email });
    if (!user) {
      const newUser = this.userRepository.create(details);
      return this.userRepository.save(newUser);
    } else {
      console.log('user logged in');
    }
  }

  //To find user:
  async findUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}

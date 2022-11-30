/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/database/models/user.model';
import { userService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: userService,
  ) {
    super();
  }
  serializeUser(user: User, done: Function) {
    console.log('serialize user');
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.userService.findUser(payload.id);
    console.log('deserialize user');
    console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}

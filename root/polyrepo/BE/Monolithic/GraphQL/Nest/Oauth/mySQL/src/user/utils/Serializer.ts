import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/database/models/user.schema';
import { UserService } from '../user.service';


@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function)
  {
    console.log('serialize user');
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function)
  {
    const user = await this.userService.findUserById(payload.id);
    console.log('deserialize user');
    console.log(user);

    return user ? done(null, user) : done(null, null);
  }
}

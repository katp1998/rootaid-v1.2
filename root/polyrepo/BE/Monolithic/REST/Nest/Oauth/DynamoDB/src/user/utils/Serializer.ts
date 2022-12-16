import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { userCreatedto } from '../dto/createUser.dto';
import { UserService } from '../user.service';


@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(user: userCreatedto, done: Function)
  {
    console.log('serialize user');
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function)
  {
    if (payload) {
      const user = await this.userService.findUserByemail(payload.email);
      console.log('deserialize user');
    
      return user ? done(null, user[0]) : done(null, null);
    }

    return done(null, null);
  }
}

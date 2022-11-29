import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  VerifyCallback
} from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService
    ) {
        
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const {
      name,
      emails,
      photos,
      displayName } = profile;
    
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
      };

    const dbuser = await this.userService.validateUser({
      email: emails[0].value,
      name: displayName
    });
    
    console.log('validating');

    console.log(dbuser);
      
    done(null, user);

  }
  
}
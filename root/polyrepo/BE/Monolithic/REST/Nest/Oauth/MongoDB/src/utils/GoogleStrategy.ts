import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { userService } from 'src/user/user.service';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: userService,
  ) {
    super({
      clientID:
        '887032304272-jbtr9ljeebemoqt2udhcgdjtnbt92eh5.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/api/user/google/redirect',
      scope: ['profile', 'email'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    //Console logging the access and refresh tokens:
    console.log(`Access token: ${accessToken}`);
    console.log(`Refresh token: ${refreshToken}`);

    //Check if user exists:
    const userExists = await this.userService.findUser({
      email: profile.emails[0].value,
    });

    if (!userExists) {
      //create user using user.service.ts create function:
      const user = await this.userService.createUser({
        email: profile.emails[0].value,
        name: profile.displayName,
      });
      console.log({ message: `user ${profile.displayName} has been created` });
    } else {
      console.log('user exists, please login');
    }
  }
}

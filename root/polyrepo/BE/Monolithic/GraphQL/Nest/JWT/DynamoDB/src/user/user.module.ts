import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
      }
    ),

    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn:'1d'}
    })
  ],
  providers: [
    UserService,
    UserResolver,
    JwtStrategy
  ]
})
export class UserModule {}

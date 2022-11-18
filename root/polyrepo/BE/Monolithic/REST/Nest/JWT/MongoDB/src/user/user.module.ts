import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'databases/models/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.jwt_secretKey || "secret1234",
      signOptions: { expiresIn:'1d'}
  })
  ],
  providers: [
    UserService,
    LocalStrategy,
    JwtStrategy
  ],

  controllers: [UserController]
})
export class UserModule {}

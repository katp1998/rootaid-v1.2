import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
      }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn:'1d'}
  })
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy
  ]
})
export class UserModule {}

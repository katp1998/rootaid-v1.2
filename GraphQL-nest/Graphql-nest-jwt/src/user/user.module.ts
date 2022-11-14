import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

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
    }),
    
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    UserService,
    UserResolver,
    JwtStrategy
  ]
})
export class UserModule {}

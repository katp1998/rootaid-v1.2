import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'database/model/user.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
      }
    ),
    TypeOrmModule.forFeature([User]),
    HttpModule  
  ],
  providers: [UserService, UserResolver]
})
export class UserModule {}

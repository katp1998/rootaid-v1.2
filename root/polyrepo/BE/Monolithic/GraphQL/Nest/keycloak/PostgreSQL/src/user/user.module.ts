import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from 'database/models/user.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  providers: [UserService,
    UserResolver]
})
export class UserModule {}

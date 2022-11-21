import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { User } from 'database/models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

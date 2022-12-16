import { Module } from '@nestjs/common';
import { User, UserSchema } from 'database/models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    HttpModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

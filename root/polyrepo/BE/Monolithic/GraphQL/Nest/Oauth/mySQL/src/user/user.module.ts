import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from 'src/database/models/user.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategy } from './utils/google.strategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
    GoogleStrategy,
    SessionSerializer
  ]
})
export class UserModule {}

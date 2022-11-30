import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { SessionSerializer } from './utils/Serializer';
import { GoogleStrategy } from './utils/google.strategy';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
    GoogleStrategy,
    SessionSerializer
  ]
})
export class UserModule {}

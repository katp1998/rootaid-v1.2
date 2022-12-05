import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GoogleStrategy } from './utils/google.strategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
  controllers: [UserController],
  providers: [UserService,
    GoogleStrategy,
    SessionSerializer]
})
export class UserModule {}

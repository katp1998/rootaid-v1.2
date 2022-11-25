import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/models/user.model';
import { GoogleStrategy } from 'src/utils/GoogleStrategy';
import { SessionSerializer } from 'src/utils/Serializer';
import { UserController } from './user.controller';
import { userService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'USER_SERVICE',
      useClass: userService,
    },
  ],
})
export class UserModule {}

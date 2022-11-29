import { Module } from '@nestjs/common';
import { User } from 'src/database/models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategy } from './utils/google.strategy';
import { SessionSerializer } from './utils/Serializer';
import { UserResolver } from './user.resolver';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    SessionSerializer,
    GoogleStrategy,
    UserResolver
    ],

})
export class UserModule {}

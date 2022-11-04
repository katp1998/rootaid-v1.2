import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule
    ],
  providers: [
    UserService,
    UserResolver
  ]
})
export class UserModule {}

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
      }
    ),
    HttpModule  
  ],
  providers: [UserResolver, UserService]
})
export class UserModule {}

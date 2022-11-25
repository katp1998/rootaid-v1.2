import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './database/models/user.model';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://kethmieperera:kat123@kattesting.xeri85k.mongodb.net/rootaid-oauth-test?retryWrites=true&w=majority', //this needs to be configured to .env file
      entities: [User],
      synchronize: true,
    }),
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

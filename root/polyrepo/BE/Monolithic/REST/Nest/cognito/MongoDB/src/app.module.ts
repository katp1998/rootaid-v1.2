import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
<<<<<<< HEAD
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule],
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/models/user.schema';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [AuthModule, 
      TypeOrmModule.forFeature(
      [User],
    ),

    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URI,
      entities: [
        User,
      ],
      synchronize: true,
    }),
  ],
>>>>>>> 08d9adf003fb816f4599d822e7cfa23df32d78d2
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

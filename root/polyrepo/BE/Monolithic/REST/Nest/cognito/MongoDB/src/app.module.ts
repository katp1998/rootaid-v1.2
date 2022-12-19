import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
<<<<<<< HEAD
import { MongooseModule } from '@nestjs/mongoose';
=======
<<<<<<< HEAD
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule],
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/models/user.schema';
>>>>>>> 4251c6e0874c7875f3acc5fd7a310a9475b0f4c9
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [AuthModule, 
    MongooseModule.forRoot(process.env.MONGO_URI)
  ],
>>>>>>> 08d9adf003fb816f4599d822e7cfa23df32d78d2
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

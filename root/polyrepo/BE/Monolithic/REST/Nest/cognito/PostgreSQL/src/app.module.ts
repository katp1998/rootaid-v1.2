import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/models/user.model';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [AuthModule, 
      TypeOrmModule.forFeature(
      [User],
    ),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
      ],
      synchronize: true,
    }),

  ConfigModule.forRoot({
      isGlobal: true,
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

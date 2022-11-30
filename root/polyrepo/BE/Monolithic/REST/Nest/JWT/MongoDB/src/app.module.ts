import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'databases/models/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
    }
    ),
    TypeOrmModule.forRoot(
      {
        type: "mongodb",
        url:process.env.DATABASE_URL,
        database: process.env.DATABASE_NAME,
        entities: [User],
        synchronize: true
                          
      }
    ),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

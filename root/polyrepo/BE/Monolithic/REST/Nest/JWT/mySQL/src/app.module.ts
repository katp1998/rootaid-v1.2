import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'database/modules/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(
    {
      envFilePath: '.env',
      isGlobal: true
      }),
    TypeOrmModule.forRoot(
      {
        type: "mysql",
        host: process.env.MYSQL_HOST,
        port: parseInt(<string>process.env.MYSQL_PORT),
        username: process.env.MYSQL_USERNAME,   
        password: null,
        database: process.env.MYSQL_DATABASE,
        entities: [User],
        synchronize: true
                          
      }
    ),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

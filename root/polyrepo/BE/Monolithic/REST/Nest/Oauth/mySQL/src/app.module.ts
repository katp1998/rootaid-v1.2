import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './database/models/user.schema';
import { UserModule } from './user/user.module';

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
        type: "mysql",
        host: process.env.MYSQL_HOST,
        port: parseInt(<string>process.env.POSTGRESQL_PORT),
        username:  process.env.MYSQL_USERNAME,
        password: null,
        database: process.env.MYSQL_DATABASE,
        entities: [User],
        synchronize: true
      }),
      PassportModule.register({ session: true }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

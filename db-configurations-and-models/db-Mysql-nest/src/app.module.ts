import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from 'database/models/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


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
        port: parseInt(<string>process.env.POSTGRESQL_PORT),
        username:  process.env.MYSQL_USERNAME,
        password: null,
        database: process.env.MYSQL_DATABASE,
        entities: [User],
        synchronize: true
        }
    ),
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
  
export class AppModule {}

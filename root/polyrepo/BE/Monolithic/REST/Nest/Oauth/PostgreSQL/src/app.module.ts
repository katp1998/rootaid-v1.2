import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
        type: "postgres",
        host: process.env.POSTGRESQL_HOST,
        port: parseInt(<string>process.env.POSTGRESQL_PORT),
        username:process.env.POSTGRESQL_USERNAME ,
        password:process.env.POSTGRESQL_PASSWORD,
        database: process.env.POSTGRESQL_DATABASE,
        autoLoadEntities:true,
        synchronize: true
        }
    ),
    PassportModule.register({ session: true }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

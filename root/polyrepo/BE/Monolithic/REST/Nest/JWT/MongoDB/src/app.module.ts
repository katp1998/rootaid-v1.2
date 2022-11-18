import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
    }
  ),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

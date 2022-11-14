import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/models/user.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './user/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    
    ConfigModule.forRoot(
      {
        envFilePath: '.env'
      }),
    
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile:join(process.cwd(),"src/schema.graphql")
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
      })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy
  ],
})
export class AppModule {}

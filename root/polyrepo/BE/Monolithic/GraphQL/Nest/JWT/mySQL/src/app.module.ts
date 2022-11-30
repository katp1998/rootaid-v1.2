import { Module } from '@nestjs/common';
import { User } from 'database/models/user.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(
    {
      envFilePath: '.env'
    }),
  
  GraphQLModule.forRoot({
    driver: ApolloDriver,
    playground: true,
    autoSchemaFile: join(process.cwd(), "src/schema.graphql"),
    formatError: (error : any) => {
      const graphQLFormattedError = {
        message:
          error.extensions?.exception?.response?.message || error.message,
        code:
          error.extensions?.code,
        status:error.extensions?.exception?.response,
        name: error.extensions?.exception?.name || error.name,
      };
      return graphQLFormattedError;
    },
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
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

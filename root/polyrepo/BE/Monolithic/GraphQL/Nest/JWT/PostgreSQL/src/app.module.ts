import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
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
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './database/models/user.entity';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

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
    PassportModule.register({ session: true }),
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}

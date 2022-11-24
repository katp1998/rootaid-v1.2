import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'database/model/user.entity';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot(
    {
      envFilePath: '.env',
      isGlobal: true
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

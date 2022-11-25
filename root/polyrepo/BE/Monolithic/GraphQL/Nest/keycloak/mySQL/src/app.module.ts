import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  KeycloakConnectModule,
  TokenValidation,
  PolicyEnforcementMode,
  AuthGuard,
  RoleGuard
} from 'nest-keycloak-connect';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { User } from 'database/model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
      }),
    
    KeycloakConnectModule.register(
      {
        authServerUrl: process.env.AUTH_SEVER_URL,
        realm: process.env.REALM,
        clientId: process.env.CLIENT_ID,
        secret: process.env.SECRET_ID,  
        policyEnforcement: PolicyEnforcementMode.PERMISSIVE, 
        tokenValidation: TokenValidation.ONLINE,
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
        }
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
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}

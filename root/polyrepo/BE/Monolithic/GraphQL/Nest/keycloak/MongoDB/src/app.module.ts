import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'database/user.entity';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  KeycloakConnectModule,
  PolicyEnforcementMode,
  TokenValidation,
  RoleGuard,
  AuthGuard
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
    }
    ),
        
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
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },],
})
export class AppModule {}

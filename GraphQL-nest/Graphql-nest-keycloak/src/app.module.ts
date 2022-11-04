import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import {
  KeycloakConnectModule,
  PolicyEnforcementMode,
  TokenValidation,
  RoleGuard
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UserModule,

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile:join(process.cwd(),"src/schema.graphql")
    }),

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
      })
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      useClass: RoleGuard,
      provide: APP_GUARD,
      
    },],
})
export class AppModule {}

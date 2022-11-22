import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  KeycloakConnectModule,
  PolicyEnforcementMode,
  TokenValidation,
  AuthGuard,
  RoleGuard
} from 'nest-keycloak-connect';
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
    KeycloakConnectModule.register(
      {
        authServerUrl: process.env.AUTH_SEVER_URL,
        realm: process.env.REALM,
        clientId: process.env.CLIENT_ID,
        secret: process.env.SECRET_ID,  
        policyEnforcement: PolicyEnforcementMode.PERMISSIVE, 
        tokenValidation: TokenValidation.ONLINE,
      }),
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
    UserModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }],
})
export class AppModule {}

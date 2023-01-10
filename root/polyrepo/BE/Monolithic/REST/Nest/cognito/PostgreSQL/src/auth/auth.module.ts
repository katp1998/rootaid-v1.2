import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthConfig } from './auth.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
    providers: [AuthConfig, AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
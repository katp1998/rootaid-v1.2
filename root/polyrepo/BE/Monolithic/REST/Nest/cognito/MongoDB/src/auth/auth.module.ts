import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/database/models/user.model";
import { UserRepository } from "src/database/repository/user.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService, UserRepository],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ]
})
export class AuthModule {

}
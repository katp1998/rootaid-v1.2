
import {
    IsString,
    IsEmail
} from 'class-validator'

export class userCreatedto {

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

}
import {
    IsString,
    IsEmail
} from "class-validator";


export class userCreatedto {
    
    @IsString()
    name: string;

    @IsEmail()
    email: string;
}
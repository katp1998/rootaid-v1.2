import {
    IsString,
    IsEmail
} from 'class-validator'

export class logindto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;
    
}
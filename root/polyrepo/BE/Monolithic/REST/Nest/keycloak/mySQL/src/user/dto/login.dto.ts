import {
    IsString
} from 'class-validator'

export class logindto {

    @IsString()
    username: string;

    @IsString()
    password: string;
    
}
import {
    Injectable,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { User } from 'database/model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { CreateUserInput } from './inputs/user.input';
import { LoginUserInput } from './inputs/auth.input';
import { stringify } from 'qs';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) 
        private userRepositary: Repository<User>,
        private readonly httpService: HttpService
    ) { }


     // Register user
    
     async createUser(createUserInput: CreateUserInput) {
       
            const {
                username,
                password,
                email
            } = createUserInput;

            const existingUser = await this.findUserByEmail(email);

         if (!existingUser) {
             try {
                 const token = await this.genarateUserToken();
                 const response = await this.httpService.axiosRef(
                     {
                         method: 'post',
                         url: `${process.env.AUTH_SEVER_URL}admin/realms/${process.env.REALM}/users`,
                         data: {
                             "enabled": true,
                             "username": username,
                             'email': email,
                             "credentials": [{
                                 "type": "password",
                                 "value": password,
                                 "temporary": false
                             }]
                         },
                         headers: {
                             Authorization: `Bearer ${token}`,
                             'Content-Type': 'application/json',
                         }
                        
                     });

                 const newUser = this.userRepositary.save(createUserInput);
                 return {
                     user: newUser,
                     message: "User created"
                 }
             }
             catch (error) {
                 throw new HttpException({
                     status: HttpStatus.NOT_ACCEPTABLE,
                     message: 'Username already exists'
                 }, HttpStatus.NOT_ACCEPTABLE)
             }

         }
         throw new HttpException({
            status: HttpStatus.NOT_ACCEPTABLE,
            message: 'Already email registered'
        }, HttpStatus.NOT_ACCEPTABLE);
           
    }

    // login user
   

    async loginUser(loginUserInput: LoginUserInput) {
        const { username, password } = loginUserInput;
        let data :any;
        try{
            const response = await this.httpService.axiosRef(
            {
                    method: 'post',
                    url: `${process.env.AUTH_SEVER_URL}realms/${process.env.REALM}/protocol/openid-connect/token`,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    data: stringify({
                        client_id: process.env.CLIENT_ID,
                        grant_type: 'password',
                        client_secret: process.env.SECRET_ID,
                        username: username,
                        password: password
                    })
            
                });
             data = response.data;
            }
            catch (error)
            {
                throw new HttpException({
                    status: HttpStatus.UNAUTHORIZED,
                    message: "Unauthorized ivar",
                    user:null,
                    access_token:null
                }, HttpStatus.UNAUTHORIZED);
            }
            
            const user = await this.findUserByUsername(username);
            
            return {
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                message: "User sucessfully logged in",
                user:user
            };
        
    }

    //public token

    async genarateUserToken() {
        try{
            const response = await this.httpService.axiosRef(
                {
                    method: 'post',
                    url: `${process.env.AUTH_SEVER_URL}realms/master/protocol/openid-connect/token`,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    data: stringify({
                        grant_type: 'client_credentials',
                        client_id: process.env.TOKEN_CLIENT_ID,
                        client_secret: process.env.TOKEN_SECRET_ID
                    })
                });
            const token = response.data.access_token;

            return token;
        }
        
        catch(error)
        {
            return error;
        }
    }

    // Get user by email
    findUserByEmail(email: string)
    {
        return this.userRepositary.findOne(
           { where: { email } }
        );
    } 

    // Get user by username
    findUserByUsername(username: string) {
        return this.userRepositary.findOne(
            {where :{ username }}
        );
    }


}

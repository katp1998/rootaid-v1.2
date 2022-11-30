import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { userCreatedto } from './dto/userCreate.dto';
import { logindto } from './dto/login.dto';
import { stringify } from 'qs';
import { User } from 'database/models/user.schema';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
    constructor(
        private readonly httpService: HttpService
    ) { }

    // Register user
    
    async createUser(userCreateDTO: userCreatedto) {
    
            const {
                username,
                password,
                email
            } = userCreateDTO;

            const existingUser = await this.findUserByEmail(email);

            if (existingUser.count == 0 )
            {
                const token = await this.genarateUserToken();
                try{
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
                }
                catch (error)
                {
                    throw new HttpException({
                        status: HttpStatus.NOT_ACCEPTABLE,
                        message: 'Already Username registered'
                    }, HttpStatus.NOT_ACCEPTABLE);
                }

                const newUser = await User.create({ "userid": uuid(), "name": username, "email": email, "password": password });
    
                throw new HttpException({
                    status: HttpStatus.CREATED,
                    message: 'Sucessfully created',
                    user:newUser
                  }, HttpStatus.CREATED)
                
            }


            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                message: 'Already email registered'
              }, HttpStatus.NOT_ACCEPTABLE)

        
    }

    // login user
   

    async loginUser(loginDTO: logindto) {
        const { username, password } = loginDTO;
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
                    message: "Unauthorized",
                    user:null,
                    access_token:null
                }, HttpStatus.UNAUTHORIZED);
            }
            
            const user = await this.findUserByUsername(username);
            
            throw new HttpException({
                status: HttpStatus.OK,
                message: 'Sucessfully Logged In',
                user: user[0],
                access_token: data.access_token,
          }, HttpStatus.OK);
        
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
        return  User.scan('email').contains(email).exec();
    } 

    // Get user by username
    findUserByUsername(username: string) {
        return  User.scan('name').contains(username).exec();
    }

}
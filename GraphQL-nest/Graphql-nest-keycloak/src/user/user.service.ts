import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { stringify } from 'qs';
import { CreateUserInput } from './inputs/createUser.input';

@Injectable()
export class UserService {

    constructor(
        private readonly httpService: HttpService
    ){}


    // Register user
    
    async createUser(createUserInput: CreateUserInput) {

        try{
            const {
                username,
                password
            } = createUserInput;

            const token = await this.genarateUserToken();

            const response = await this.httpService.axiosRef(
                {
                    method: 'post',
                    url: `http://127.0.0.1:8080/admin/realms/${process.env.REALM}/users`,
                    data: {
                        "enabled": true,
                        "username": username,
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
     
            const data = response.data;
            
            return {
                message: "Sucessfully created"
            };
              
        }
        catch (error)
        {
            return {
                message:"Already User exists"
            };
        }
        
    }

    // login user
   

    async loginUser(createUserInput: CreateUserInput) {
        const { username, password } = createUserInput;

        try {
            
            const response = await this.httpService.axiosRef(
            {
                    method: 'post',
                    url: `http://127.0.0.1:8080/realms/${process.env.REALM}/protocol/openid-connect/token`,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    data: stringify({
                        client_id: process.env.CLIENT_ID,
                        grant_type: 'password',
                        client_secret: process.env.SECRET_ID,
                        username: username,
                        password: password
                    })
                });
            
            const data = response.data;
            
            return {
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                message:"Sucessfully logged in"
            };
        }

        catch (error)
        {
            return {
                access_token: null,
                refresh_token:null,
                message:"User credentials error"
            }
        }
        
    }

    //public token

    async genarateUserToken() {
        try {

            const response = await this.httpService.axiosRef(
                {
                    method: 'post',
                    url: `http://127.0.0.1:8080/realms/master/protocol/openid-connect/token`,
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

        catch (error)
        {
            return error;
        }
        
    }
}

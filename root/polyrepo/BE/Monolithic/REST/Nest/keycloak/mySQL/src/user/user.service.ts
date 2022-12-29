import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'database/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { userCreatedto } from './dto/userCreate.dto';
import { logindto } from './dto/login.dto';
import { stringify } from 'qs';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) 
        private userRepositary: Repository<User>,
        private readonly httpService: HttpService
    ) { }

     // Register user
    
     async signUp(userCreateDTO: userCreatedto) {
        try{
            const {
                username,
                password,
                email
            } = userCreateDTO;

            const existingUser = await this.findUserByEmail(email);

            if (!existingUser)
            {
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

                const newUser = this.userRepositary.save(userCreateDTO);
    
                return { message: "created" };            
            }
            


            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                message: 'Already email registered'
              }, HttpStatus.NOT_ACCEPTABLE)
  
        }
        catch (error)
        {
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                message: error
              }, HttpStatus.NOT_ACCEPTABLE)
        }        
     }
    

// login user
    async logIn(loginDTO: logindto)
    {
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
            console.log(error);
            return null;
        }
            
        const user = await this.findUserByUsername(username);

        //save refresh token
        await this.userRepositary.update({ id: user.id }, { refreshToken: data.refresh_token });
            
        return {
            user: user,
            access_token: data.access_token,
            refresh_token: data.refresh_token
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

    //logout user

    async logOut(refreshToken: string) {
        try{
        const response = await this.httpService.axiosRef(
            {
                method: 'post',
                url: `${process.env.AUTH_SEVER_URL}realms/master/protocol/openid-connect/logout`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    Authorization: `Bearer ${refreshToken}`
                }
            }
        );
            // remove refresh token from db
            await this.userRepositary.update({ refreshToken: refreshToken }, { refreshToken: '' });

            return 'Logout sucessfully';
        }
        catch (error)
        {
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                message: 'User not validate'
            }, HttpStatus.NOT_ACCEPTABLE);
        }
    }


   // verify refresh token

    async verifyRefreshToken(refreshToken: string) {
        try {
            const response = await this.httpService.axiosRef(
                {
                    method: 'post',
                    url: `${process.env.AUTH_SEVER_URL}realms/${process.env.REALM}/protocol/openid-connect/token`,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    data: stringify({
                        client_id: process.env.CLIENT_ID,
                        grant_type: 'refresh_token',
                        client_secret: process.env.SECRET_ID,
                        refresh_token: refreshToken
                    })
            
                });
    
            return response.data;
        }
        catch (error)
        {
            console.log(error);
            return 'Refresh token not accepted';
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
    findUserByUsername(username: string)
    {
        return this.userRepositary.findOne(
            {where :{ username }}
        );
    }


}

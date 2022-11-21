import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { userCreatedto } from './dto/userCreate.dto';
import { stringify } from 'qs';
import { User } from 'database/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepositary: Repository<User>,
        private readonly httpService: HttpService
    ) { }
    

     // Register user
    
     async createUser(userCreateDTO: userCreatedto) {
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
        catch (error)
        {
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                message: error
              }, HttpStatus.NOT_ACCEPTABLE)
        }


        
    }

    // login user
   

    async loginUser(userCreateDTO: userCreatedto) {
        const { username, password } = userCreateDTO;
        
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
            
            const data = response.data;
            
            throw new HttpException({
                status: HttpStatus.ACCEPTED,
                message: 'Sucessfully Logged In',
                access_token: data.access_token,
          }, HttpStatus.ACCEPTED);
        
        }
        catch (error)
        {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                message: 'User unauthorized',
                access_token:null
            }, HttpStatus.UNAUTHORIZED);
        }
        
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


    findUserByEmail(email: string)
    {
        return this.userRepositary.findOne(
           { where: { email } }
        );
    } 
}

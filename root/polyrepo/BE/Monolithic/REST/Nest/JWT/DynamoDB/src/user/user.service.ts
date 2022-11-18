import {
    HttpException,
    HttpStatus,
    Injectable
} from '@nestjs/common';
import {
    config,
    DynamoDB
} from 'aws-sdk'
import { compare } from 'bcrypt';
import { encodePassword } from 'src/utils/bcrypt';
import { logindto } from './dto/login.dto';
import { userCreatedto } from './dto/userCreate.dto';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        private jwtService : JwtService
    ){}

    private con =  config.update({
        region: process.env.REGION,
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRECT_ACCESS_KEY_ID
    });

    private dynamoClient = new DynamoDB.DocumentClient();

    private TABLE_NAME = 'nestjs';

// Register user
    
async register(userCreateDTO: userCreatedto) {
    const existingUser = await this.getUserByEmail(userCreateDTO.email);

    if (!existingUser)
    {
        const password = await encodePassword(userCreateDTO.password);
        const user = {
            userid: uuid(),
            ...userCreateDTO,
            password
            
        }

        try {

            await this.dynamoClient
                .put({
            
                    TableName: this.TABLE_NAME,
                    Item: user,
          
                })
                .promise();
        }
        catch (error)
        {
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                message: error
            }, HttpStatus.NOT_ACCEPTABLE);
        }

        throw new HttpException({
            status: HttpStatus.CREATED,
            message: 'Sucessfully created'
        }, HttpStatus.CREATED);

    }

    throw new HttpException({
        status: HttpStatus.NOT_ACCEPTABLE,
        message: 'Already email registered'
    }, HttpStatus.NOT_ACCEPTABLE);
    
}

    // Validate user

    async validateUser(loginDTO: logindto) {
        const user = await this.getUserByEmail(loginDTO.email);

        if (user)
        {
            const isMatch = await compare(loginDTO.password, user.password);

            if (isMatch)
            {
                const payload = { email: user.email, id: user.id, name:user.name };
                const token = this.jwtService.sign(payload);

                throw new HttpException({
                    status: HttpStatus.ACCEPTED,
                    message: 'Sucessfully Logged In',
                    user: user,
                    accessToken:token 
                }, HttpStatus.ACCEPTED);
            }

            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                message: 'Incorrect password',
                user: null
            }, HttpStatus.UNAUTHORIZED);
            
        }

        throw new HttpException({
            status: HttpStatus.NOT_ACCEPTABLE,
            message: 'User not exists',
            user: null
        }, HttpStatus.NOT_ACCEPTABLE);

    }

// find user by email ID

async  getUserByEmail(email: string) {
    const params = {
        TableName : this.TABLE_NAME,
        FilterExpression : 'email = :email',
        ExpressionAttributeValues : {':email' : email}
    };


         const resp =await this.dynamoClient.scan(params).promise(); 
    
   return resp.Items[0];
}


}

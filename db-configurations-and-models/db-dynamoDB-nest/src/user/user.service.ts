import { Injectable } from '@nestjs/common';
import {
    config,
    DynamoDB
} from 'aws-sdk'
import { userCreatedto } from './dto/userCreate.dto';
import { v4 as uuid } from 'uuid';
import { encodePassword } from 'src/utils/bcrypt';


@Injectable()
    
export class UserService {

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
                return (error);
            }
    
            return{
                user,
                message:"Sucessfully Registered"
             }
        }
        return {
            user:null,
            message: "Already email registered"  
        }
        
        
        
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

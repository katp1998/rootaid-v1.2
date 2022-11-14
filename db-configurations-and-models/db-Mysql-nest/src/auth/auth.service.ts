import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { logindto } from './dto/login.dto';
import { compare } from 'bcrypt';

@Injectable()
    
export class AuthService {

    constructor(
        private userService: UserService
    ) { }

// validate user
    
    async validateUser(loginDTO: logindto) {
        const user = await this.userService.getUserByEmail(loginDTO.email);

        if (user)
        {
            const isMatch = await compare(loginDTO.password, user.password);

            if (isMatch)
            {
                
            return {
                user,
                message:"Sucessfully Login"
            };
            }

            return {
                user:null,
                message:"Incorrect password"
            };
            
        }
        return {
            user:null,
            message:"User not exists"
        };

    }
    




}

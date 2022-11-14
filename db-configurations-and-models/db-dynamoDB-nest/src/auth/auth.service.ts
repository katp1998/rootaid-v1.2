import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { logindto } from './dto/login.dto';

@Injectable()
    
export class AuthService {

    constructor(
        private userService: UserService
    ) { }

    // Validate user
    
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

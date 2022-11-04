import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginUserInput } from './auth.input';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
){}

    
     async validateUser(loginUserInput: LoginUserInput) {
        const user = await this.userService.getUserByEmail(loginUserInput.email);
        await console.log("login fuctionality");

        if (user)
        {
            const isMatch = await compare(loginUserInput.password, user.password);

            if (isMatch)
            {
               
                await console.log("sucessfully login")
                return user;
            }

            return {
                user:null,
                message:"Incorrect password"
            };
            
        }
        await console.log("creadentials error")
        return {
            user:null,
            message:"User not exists"
        };

    }
    
}

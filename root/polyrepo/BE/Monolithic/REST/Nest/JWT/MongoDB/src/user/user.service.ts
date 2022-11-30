import {
    HttpException,
    HttpStatus,
    Injectable
} from '@nestjs/common';
import { userCreatedto } from './dto/user.create.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { logindto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'databases/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) 
        private userRepositary: Repository<User>,
        private jwtService : JwtService
    ) { }

     // register User

     async register(createUserDTO: userCreatedto) {
        const existingUser = await this.findUserByEmail(createUserDTO.email);

        if (!existingUser)
        {
            const password = await encodePassword(createUserDTO.password);
            const newUser = this.userRepositary.save({ ...createUserDTO, password });

            throw new HttpException({
                status: HttpStatus.CREATED,
                message: 'Sucessfully created'
              }, HttpStatus.CREATED)
            
        }

        throw new HttpException({
            status: HttpStatus.NOT_ACCEPTABLE,
            message: 'Already email registered'
          }, HttpStatus.NOT_ACCEPTABLE)

     }
    
    // Validate user

    async validateUser(loginDTO: logindto) {
        const user = await this.findUserByEmail(loginDTO.email);

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
                  access_token: token,
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
    
     // get by email id

     findUserByEmail(email: string)
     {
         return this.userRepositary.findOne(
            { where: { email } }
         );
     }  
}

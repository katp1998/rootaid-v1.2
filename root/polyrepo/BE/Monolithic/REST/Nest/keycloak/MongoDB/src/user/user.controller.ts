import {
    Body,
    Controller,
    Get,
    Post,
    Res
} from '@nestjs/common';
import { userCreatedto } from './dto/userCreate.dto';
import { UserService } from './user.service';
import {
    Public,
    Roles
} from 'nest-keycloak-connect';
import {
    Request,
    Response
} from 'express'
import { Req } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }
    // Register user
    @Public()
    @Post('register')
    createUser(@Body() userCreateDTO: userCreatedto)
    {
        return this.userService.createUser(userCreateDTO);
    }

    // Login user
    @Public()
    @Post('login')
    async loginUser(@Body() userCreateDTO: userCreatedto,@Res({ passthrough: true }) response: Response)
    {
        let result :any;
        try {

            result = await this.userService.loginUser(userCreateDTO);
            console.log(result.refresh_token);
            response.cookie('jwt', result.refresh_token, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        }
        catch (error)
        {
            console.log(error );
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                message: "Unauthorized",
                user:null,
                access_token:null
            }, HttpStatus.UNAUTHORIZED);
        
        }

        throw new HttpException({
            status: HttpStatus.OK,
            message: 'Sucessfully Logged In',
            user: result.user,
            access_token: result.access_token,
        }, HttpStatus.OK);
    
    }
        
    // refresh token
    @Public()
    @Get('refreshtoken')
    async handleRefreshToken(@Req() request: Request) {

        const cookies = await request.cookies;

        if (!cookies?.jwt)
        {
            throw new HttpException(
            {   status: HttpStatus.UNAUTHORIZED,
                    message: "Unauthorized"
                },HttpStatus.UNAUTHORIZED);
        } 

        const refreshToken = cookies.jwt as string
        console.log("Refresh Token Endpoint", refreshToken)

        return this.userService.verifyRefreshToken(refreshToken)
    } 

    
    //logout
    @Public()
    @Get('logout')
    async handleLogout(@Req() request: Request, @Res() response: Response) {
        const cookies = request.cookies;

        if (!cookies?.jwt) 
        {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    message: "Unauthorized"
                }, HttpStatus.UNAUTHORIZED);
            
        }

        const refreshToken = cookies.jwt;
        await this.userService.logoutUser(refreshToken);

        // clear cookie
        response.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    
        throw new HttpException({
            status: HttpStatus.OK,
            message: 'Sucessfully Logged out',
        }, HttpStatus.OK);
    }
    
    // protect route

    @Roles({ roles: [] })
        @Get()
    getuser()
    {
        return "hello";
    }

}



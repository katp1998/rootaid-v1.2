import { Body, Controller, Post, Get, Req, Res, HttpException, HttpStatus} from "@nestjs/common";
import { Request, Response } from 'express'
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post('register')
    async handleRegister(@Body() dto: RegisterDto) {
        //destructure data from DTO
        const {username, password, email} = dto

        //create user attributes array and pass email as key => value pair
        let userAttr = []
        userAttr.push({Name: 'email', Value: email})

        //call service method for registering a user
        return await this.authService.registerUser(username, password, userAttr)
    }

    @Post('login')
    async handleLogin(@Body() dto: LoginDto,  @Res({ passthrough: true }) response: Response) {
        //destructure data from DTO
        const {username, password} = dto

        //get refresh token returned from loginUser service method, and attach it to response as a cookie
        const result = await this.authService.loginUser(username, password)
        response.cookie('jwt', result, {httpOnly:true, sameSite:'none', maxAge:24*60*60*1000})

        return `Login successful, attached refresh token as a cookie\!
        username: ${username}
        refresh token: ${result}
        `
    }

    @Get('refreshtoken')
    async handleRefreshToken(@Req() request: Request) {
        const cookies = request.cookies

        if(!cookies?.jwt) throw new HttpException('Message', HttpStatus.NO_CONTENT);;
        const refreshToken = cookies.jwt as string

        try {
            return await this.authService.verifyRefreshToken(refreshToken)
        } catch (error) {
            return error
        }
    }

    @Post('logout')
    async handleLogout(@Req() request: Request, @Res() response: Response) {
    const cookies = request.cookies
    if (!cookies?.jwt) return response.sendStatus(204); 
    const refreshToken = cookies.jwt

    await this.authService.logoutUser(refreshToken) 
    
    response.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return response.sendStatus(200);
    }
}
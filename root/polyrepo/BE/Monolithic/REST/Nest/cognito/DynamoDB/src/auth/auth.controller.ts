import { Body, Controller, Post, Get, Req, Res, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express'
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post('register')
    async handleRegister(@Body() dto: RegisterDto) {
        const {username, password, email} = dto

        let userAttr = []
        userAttr.push({Name: 'email', Value: email})

        return this.authService.registerUser(username, password, userAttr)
    }

    @Post('login')
    async handleLogin(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
        const {username, password} = dto

        const result = await this.authService.loginUser(username, password)
        // console.log(result)
        response.cookie('jwt', result, {httpOnly:true, sameSite:'none', maxAge:24*60*60*1000})
        return result


    }

    @Get('refreshtoken')
    async handleRefreshToken(@Req() request: Request) {
        const cookies = request.cookies
        // const username = request.username
        if(!cookies?.jwt) throw new HttpException('Message', HttpStatus.NO_CONTENT);;
        const refreshToken = cookies.jwt as string
        console.log("Refresh Token Endpoint", refreshToken)

        return this.authService.verifyRefreshToken(refreshToken)
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
import { Body, Controller, Post, Get, Req, Res, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express'
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post('register')
<<<<<<< HEAD
    async handleRegister(@Body() dto: RegisterDto) {
=======
<<<<<<< HEAD
    register(@Body() dto: RegisterDto) {
=======
    handleRegister(@Body() dto: RegisterDto) {
>>>>>>> 08d9adf003fb816f4599d822e7cfa23df32d78d2
>>>>>>> 4251c6e0874c7875f3acc5fd7a310a9475b0f4c9
        const {username, password, email} = dto

        let userAttr = []
        userAttr.push({Name: 'email', Value: email})

<<<<<<< HEAD
        return this.authService.register(username, password, userAttr)
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        const {username, password} = dto
        
        return this.authService.login(username, password)
=======
        return this.authService.registerUser(username, password, userAttr)
    }

    @Post('login')
    async handleLogin(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
        const {username, password} = dto

<<<<<<< HEAD
        const result = await this.authService.loginUser(username, password)
        response.cookie('jwt', result, {httpOnly:true, sameSite:'none', maxAge:24*60*60*1000})

        return result

    }

    @Get('refreshtoken')
    async handleRefreshToken(@Req() request: Request) {
        const cookies = request.cookies
        // const username = request.username
        if(!cookies?.jwt) throw new HttpException('Message', HttpStatus.NO_CONTENT);;
        const refreshToken = cookies.jwt as string
        console.log(`Refresh token endpoint result:
            ${refreshToken}
        `)

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
=======
        return this.authService.loginUser(username, password)
>>>>>>> 08d9adf003fb816f4599d822e7cfa23df32d78d2
>>>>>>> 4251c6e0874c7875f3acc5fd7a310a9475b0f4c9
    }
}
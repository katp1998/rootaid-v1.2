export interface CreateUserDto {
    username: string
    password: string
    email: string
    refreshToken: string
}

export interface SaveRefreshTokenDto {
    // username: string
    // password: string
    // email: string
    refreshToken: string
}
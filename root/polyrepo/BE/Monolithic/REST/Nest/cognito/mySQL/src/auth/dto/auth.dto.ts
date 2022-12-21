// DTO for when registering a user
export interface RegisterDto {
    username: string
    password: string
    email: string
}

// DTO for when login as a user
export interface LoginDto {
    username: string
    password: string
}
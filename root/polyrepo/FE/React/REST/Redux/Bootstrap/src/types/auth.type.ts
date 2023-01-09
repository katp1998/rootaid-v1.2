export interface AuthAction {
    type: string;
    payload: AuthState;
}

export interface AuthState {
    accessToken? :string
    isAuthenticated: boolean
    errMessage?:string
}
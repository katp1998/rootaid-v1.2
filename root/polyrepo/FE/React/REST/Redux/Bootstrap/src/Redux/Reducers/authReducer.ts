import {
    AuthAction,
    AuthState
} from "../../types/auth.type"
import { authConstants } from "../Constants"

const initialState :AuthState = {
    accessToken: '',
    isAuthenticated: false,
    errMessage:''
}

export const authReducer = (state: AuthState = initialState, action: AuthAction) =>
{
    switch (action.type)
    {
        case authConstants.LOGIN_SUCCESS:
            return state = { ...state, accessToken: action.payload.accessToken, isAuthenticated: true}
            break;

        case authConstants.LOGOUT_SUCCESS:
            return state = { ...initialState }
            break;
        
        case authConstants.LOGIN_FAILIURE:
            return state = { ...state, errMessage: action.payload.errMessage }
            break;
        
        case authConstants.SET_ACCESS_TOKEN:
            return state = { ...state, accessToken: action.payload.accessToken }
            break; 
        
        case authConstants.IS_USER_LOGGEDIN:
            return state = { ...state, accessToken: action.payload.accessToken, isAuthenticated: action.payload.isAuthenticated }
            break;

        default:
            return state;
    }
}
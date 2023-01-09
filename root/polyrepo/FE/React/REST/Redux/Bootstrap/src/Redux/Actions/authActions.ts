import authService from "../../api/authService";
import { User } from "../../types/user.type";
import { AuthState } from "../../types/auth.type";
import { authConstants} from "../Constants";

// Register
export const register = (user: User) => 
{
    return async (dispatch: any) =>
    { 
        try
        {
          // get response from register endpoint
            const response = await authService.register(user);
            const accessToken = await response?.data?.accessToken;

            const auth: AuthState = {
                accessToken: accessToken,
                isAuthenticated: true
            }
            
            localStorage.setItem('auth', JSON.stringify(auth));
            
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    accessToken
                }
            });
        }
        catch (error: any)
        {
            const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong';
            
            dispatch({
                type: authConstants.LOGIN_FAILIURE,
                payload: { errMessage:message }
            })

        }
    }
}

// login
export const login = (user: User) =>
{
    return async (dispatch: any) =>
    {
        try
        {
            const response = await authService.login(user);
            const accessToken = await response?.data?.accessToken;

            const auth :AuthState = {
                accessToken: accessToken,
                isAuthenticated: true
            }
            
            localStorage.setItem('auth', JSON.stringify(auth));

            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    accessToken:accessToken
                }
            })

        }
        catch (error: any)
        {
            const message = await error.response && error.response.data.error ? error.response.data.error : 'Something went wrong';

            dispatch({
                type: authConstants.LOGIN_FAILIURE,
                payload: { errMessage:message }
            })

        }
    }

};

// Set new accesstoken
export const setAccessToken = (accessToken: string) =>
{
    return async (dispatch: any) =>
    {
        dispatch({
            type: authConstants.SET_ACCESS_TOKEN,
            payload:  {
                accessToken: accessToken
            }
        })
    }
}

// logout

export const logout = () =>
{
    return async (dispatch: any) =>
    {
        const auth :AuthState = {
            accessToken:'',
            isAuthenticated: false
        }
        
        localStorage.setItem('auth', JSON.stringify(auth));
        dispatch({
            type: authConstants.LOGOUT_SUCCESS
        })
    }
}

// check user logged in or not
export const isUserLogin = () =>
{
    return async (dispatch: any) =>
    {
        const storedState  = JSON.parse(localStorage.getItem('auth') || '{}');

        dispatch({
            type: authConstants.IS_USER_LOGGEDIN,
            payload: {
                accessToken: storedState?.accessToken,
                isAuthenticated: storedState?.isAuthenticated
            }
        })
    }
}
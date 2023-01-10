import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../api/authService';
import { AuthState } from '../../types/auth.type';
import { User } from '../../types/user.type';

const initialState: AuthState = {
    accessToken: '',
    isAuthenticated: false,
    errMessage:''
}

// register
export const register = createAsyncThunk(
    'auth/register',
    async (data: User, thunkAPI: any) => {
        try {
            const response = await authService.register(data);
            const accessToken = await response?.data?.accessToken;

            const auth: AuthState = {
                accessToken: accessToken,
                isAuthenticated: true
            }
            localStorage.setItem('auth', JSON.stringify(auth));
            return response;
        }
        catch (error: any)
        {
            const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (data: User, thunkAPI: any) => {
        try
        {
            const response = await authService.login(data);
            const accessToken = await response?.data?.accessToken;

            const auth: AuthState = {
                accessToken: accessToken,
                isAuthenticated: true
            }
            localStorage.setItem('auth', JSON.stringify(auth));

            return response;
        }
        catch (error: any)
        {
            const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
            return thunkAPI.rejectWithValue(message)
        }
    }
);


// logout

export const logout = createAsyncThunk('auth/logout', async () =>
{
    const auth :AuthState ={
        accessToken: '',
        isAuthenticated: false
    }
    await localStorage.setItem('auth', JSON.stringify(auth));
    
    await authService.logout();

    return null;
    
});

// check user logged in or not

export const isUserLogin = createAsyncThunk('user/isuser', async () =>
{
    const storedState = JSON.parse(localStorage.getItem('auth') || '{}');
    return storedState;
});

// update accesstoken
export const setAccessToken = createAsyncThunk('user/accessToken',
    async (data: string, thunkAPI: any) => {
        const auth :AuthState ={
            accessToken: data,
            isAuthenticated: true
        }
        await localStorage.setItem('auth', JSON.stringify(auth));
        
        return data;
});


// slice
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) =>
    {
        builder.addCase(register.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.errMessage = action.payload as string
        });
        builder.addCase(login.fulfilled, (state,action) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.errMessage = action.payload as string
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.accessToken = '';
            state.isAuthenticated = false;
            state.errMessage = '';
        });
        builder.addCase(isUserLogin.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = action.payload.isAuthenticated;
        });
        builder.addCase(setAccessToken.fulfilled, (state, action) => {
            state.accessToken = action.payload;
        });

    }
})


export default authSlice.reducer

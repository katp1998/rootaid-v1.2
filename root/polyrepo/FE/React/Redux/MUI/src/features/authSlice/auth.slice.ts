import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import authService from '../authService/auth.service'
import { User } from '../../types/user.type'


const user = JSON.parse(localStorage.getItem('user') as string) 

export interface UserState {
    user?: User
    isLoading: boolean
    isError:boolean
    message: string
}

const initialState: UserState = {
    isLoading:false,
    user: user ? user : null,
    isError: false,
    message: ''
}

export const register = createAsyncThunk(
    'auth/register',
    async (data:User,thunkAPI: any) => {
        try {
            const response = await authService.register(data)
            return response
        } catch (error : any) {
            const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data:User,thunkAPI: any) => {
        try {
            const response = await authService.login(data)
            return response
        } catch (error : any) {
            const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()
})

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        reset: (state: UserState) => {
            state.user = initialState.user
            state.isLoading = initialState.isLoading
            state.isError = initialState.isError
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(register.pending, (state,action) => {
            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state,action) => {
            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(register.rejected,(state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
        })
        builder.addCase(login.pending, (state,action) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state,action) => {
            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(login.rejected,(state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
        })
    }
})

export const {reset} = authSlice.actions

export default authSlice.reducer
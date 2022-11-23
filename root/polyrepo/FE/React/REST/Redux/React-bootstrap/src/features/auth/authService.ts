import {createAsyncThunk} from '@reduxjs/toolkit'
import { User } from '../../types/user'
import axios from 'axios'

const API_URL = "http://localhost:8000/api/user/"

export const register = createAsyncThunk("/register", async (data, thunkAPI) => {
    try {
        const response = await axios.post(API_URL + "register", data)
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const login = createAsyncThunk("/login" , async (data, thunkAPI) => {
    try{
        const response = await axios.post(API_URL + "login", data);
        return response
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

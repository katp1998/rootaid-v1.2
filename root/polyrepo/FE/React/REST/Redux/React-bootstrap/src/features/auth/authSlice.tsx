import { createSlice } from '@reduxjs/toolkit'
import {register, login} from './authService'

//get user from localStorage:
//const user = JSON.parse(localStorage.getItem("user")); //need to parse cz localStorage can have only strings


const initialState = {
    //user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      reset: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "Registration Successful"
          //state.user = action.payload;

        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = "Registration failed"
          //state.user = null; //as something went wrong with the registration
          
        })
        .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "Login successful"
          //state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = "Login failed"
          //state.user = null;

        });
    },
  });

export const { reset } = authSlice.actions;
export default authSlice.reducer;
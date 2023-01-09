import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  accessToken: string,
  isAuthenticated: boolean
}

const initialState: AuthState = {
  accessToken: '',
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.accessToken = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
        state.accessToken = ''
        state.isAuthenticated = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuth, logout } = authSlice.actions

export default authSlice.reducer
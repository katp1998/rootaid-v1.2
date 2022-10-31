import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

type User = {
  name: string
  email: string
  password: string
}
type InitialState = {
  loading: boolean
  users: User[]
  error: string
}
const initialState: InitialState = {
  loading: false,
  users: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const login = createAsyncThunk('user/login', () => {
  return axios
    .get('') //add url here
    .then(response => response.data)
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true
    })
    builder.addCase(
        login.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false
        state.users = action.payload
        state.error = ''
      }
    )
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default userSlice.reducer
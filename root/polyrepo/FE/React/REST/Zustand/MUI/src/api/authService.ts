import axios from "./axios";
import { User } from "../types/user.type";

// register
const register = async (userData: User) => {

     const response = await axios.post('/register',userData,
     {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
     })

     return response
}

// login
const login = async (userData: User) => {
    const response = await axios.post('/login', userData, 
    {
        headers: { 'Content-Type': 'application/json' },
        withCredentials:true
    })
    
     return response
}

// logout
const logout = async () => {
    const response = await axios.post('/logout',null,
     {
        withCredentials:true
    } )
}

const authService = {
    register,
    logout,
    login
}

export default authService
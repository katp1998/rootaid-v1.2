
import axios from "./axios";
import { User } from "../../types/user.type";

// register
const register = async (userData: User) => {

    try {

     const response = await axios.post('/register',userData,
     {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
     })

    console.log(`Succesfully registered user: ${userData.name}`)
    return response

    } catch (error) {
       console.log(`Registration failed,
       error: ${error}`) 
    } 

}

// login
const login = async (userData: User) => {

    try {
        const response = await axios.post('/login', userData, 
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials:true
        })

        return response        
    } catch (error) {
        console.log(`Login failed,
        error: ${error}`)
        return undefined        
    }

}

// logout
const logout = async () => {

    try {
    await axios.post('/logout',null,
     {
        withCredentials:true
    } )

    console.log('Successful logout.')
    return {"isLoggedOut": true}
    } catch (error) {
        console.log(`Logout failed,
        ${error}`)
        return undefined
    }

}

const authService = {
    register,
    logout,
    login
}

export default authService
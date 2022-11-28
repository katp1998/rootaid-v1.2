import axios from "axios";
import { User } from "../types/user.type";


const API_URL = "/user";

const register = async (userData: User) => {
  const response = await axios.post(API_URL + '/register',userData)

  if (response.data)  {
     localStorage.setItem('user',JSON.stringify(response.data))
  }

  return response.data
}

const login = async (userData: User) => {
 const response = await axios.post(API_URL + '/login', userData)

 if (response.data.token)  {
     localStorage.setItem('user',JSON.stringify(response.data))
  }

  return response.data
}

const logout = () => {
  localStorage.clear();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") as string);
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
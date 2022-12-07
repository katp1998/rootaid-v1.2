import axios from "axios";
import { User } from "../types/user.type";


const API_URL = "/user";

const register = (userData:User) => {
  return axios.post(API_URL + "/register", userData)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (userData: User) => {
   return axios.post(API_URL + "/login",userData)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

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
import axios from "axios";

const API_URL = "/user";

const register = (name :any,email:any,password:any) => {
  return axios.post(API_URL + "/register", {
      name,  
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response;
    });
};

const login = (email:any, password:any) => {
   return axios.post(API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response;
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
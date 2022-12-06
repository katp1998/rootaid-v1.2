import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "/user";

const getPrivateRoute = () => {
  const response =  axios.get(API_URL + "/private", { headers: authHeader() });
  return response
};

export default getPrivateRoute
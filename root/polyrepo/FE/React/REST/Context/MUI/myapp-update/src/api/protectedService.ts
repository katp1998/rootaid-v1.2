import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "/user";

const getPrivateRoute = async (accessToken:string) => {
  const response =  await axios.get(API_URL + "/private", { headers: authHeader(accessToken) });
  return response.data
};

export default getPrivateRoute
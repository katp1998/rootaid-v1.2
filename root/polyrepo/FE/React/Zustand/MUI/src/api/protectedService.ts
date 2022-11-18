import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "/user";

const getPrivateRoute = () => {
  return axios.get(API_URL + '/private' ,  { headers: authHeader() })
    .then((response) => {
      return response
    })
};

export default getPrivateRoute
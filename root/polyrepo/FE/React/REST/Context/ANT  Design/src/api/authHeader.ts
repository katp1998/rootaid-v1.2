export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user") as string);
  
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.token };
      //return { "x-auth-token": user.accessToken };
    } else {
      return {};
    }
  }
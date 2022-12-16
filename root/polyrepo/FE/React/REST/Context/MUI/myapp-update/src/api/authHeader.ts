export default function authHeader(accessToken:string) {
  
    if (accessToken) {
      return { Authorization: 'Bearer ' + accessToken};
      //return { "x-auth-token": user.accessToken };
    } else {
      return {};
    }
  }
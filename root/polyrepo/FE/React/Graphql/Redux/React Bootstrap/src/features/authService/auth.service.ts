import axios from "axios";
import { User } from "../../types/user.type";

const API_URL = 'http://localhost:5000'


// const register = async (userData:User) => {
//     const query = 
//     `
//     mutation($name:String!,$email:String!, $password:String!) {
//         register(name:$name,email:$email,password:$password){
//                 token,
//                 id,
//                 name
//                     }
//                 }   
            
//     `
//     axios.post("http://localhost:5000/graphql", {
//         query,
//         variables: userData
//       }).then(res => {
//         console.log(res.data.login)
//         return res.data
        
//       }).catch(err => {
//         console.log(err)
//         return err
        
//       });
// }

// const login = async (userData:User) => {
//     const query = 
//     ` 
//     query($email:String!,$password:String!){
//         login(email: $email, password:$password) {
//             token,
//             id
//             }   
//         }
//     `
//     axios.post("http://localhost:5000/graphql", {
//         query,
//         variables: userData
//       }).then(res => {
//          console.log(res.data)
//         return "success"
        
//       }).catch(err => {
//         console.log(err)
//         return "fail"
        
//       });
// }

const register = async (userData: User) => {
    const response = await axios.post(API_URL + '/graphql', {
          query: `
                mutation($name:String!,$email:String!, $password:String!) {
                  register(name:$name,email:$email,password:$password){
                          token,
                          id
                              }
                          }
              
        `,
        variables: {
            name:userData.name,
            email:userData.email,
            password: userData.password
        }

      ,
        headers: {
            'Content-Type': 'application/json'
          }

    });
    if(response.data.errors) {
      console.log(response.data.errors[0].message)
      
      throw new Error (response.data.errors[0].message)
  }
  
  if (response.data)  {
      localStorage.setItem('user',JSON.stringify(response.data))
      console.log(response.data)
      return response.data
   }
}

// // const register = async (userData: User) => {
// //      const response = await axios.post(API_URL + '/register',userData)

// //      if (response.data)  {
// //         localStorage.setItem('user',JSON.stringify(response.data))
// //      }

// //      return response.data
// // }

const login = async (userData: User) => {
    const response = await axios.post(API_URL + '/graphql', {
        query: `
            query($email:String!,$password:String!){
                  login(email: $email, password:$password) {
                      token,
                      id
                      }   
                  }
        `,
        variables: {
            email:userData.email,
            password:userData.password
        },
        headers: {
            'Content-Type': 'application/json'
          }
    });
    
    if(response.data.errors) {
        console.log(response.data.errors[0].message)
        
        throw new Error (response.data.errors[0].message)
    }
    
    if (response.data)  {
        localStorage.setItem('user',JSON.stringify(response.data))
        console.log(response.data)
        return response.data
     }


}

// const login = async (userData: User) => {
//     const response = await axios.post(API_URL + '/login', userData)

//     if (response.data)  {
//         localStorage.setItem('user',JSON.stringify(response.data))
//      }

//      return response.data
// }

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService
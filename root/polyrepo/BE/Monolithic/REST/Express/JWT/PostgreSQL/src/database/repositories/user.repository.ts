import { User } from '../models/user.model';
import { Request, Response } from 'express';

//@DESC: FIND IF USER EXISTS
//@ROUTE: POST /api/v1.2/auth/
export const findUser =async (email:any) => {
  //CHECK IF USER WITH SAME EMAIL ADDRESS EXISTS
  try {
    const existingUser = await User.findOne({ where: { email } })
    return existingUser
    }
  catch (error) {
    console.log(error)
  }
}
  
  //@desc CREATING USER
  //@route POST /api/v1.2/auth/create
  export const createUser = async ({name, email, password}: {name: string, email: string, password: string}) => { //types to be tested in integration between service and controller files
      try {
          
        //CREATE USER:
        const user = await User.save({
          name,
          email,
          password
        })
        //RETURN SUCCESS RESPONSE
        return user

      } catch (error) {
        console.log(error)
        //RETURN UNSUCCESSFUL RESPONSE
        return error
      }


}
  
  //@desc LOGIN
  //@route GET /api/v1.2/auth/login
  // export const loginUser = async ({email, password} : any) => {
  //   try {

  //     const user = await User.findOne({ where: { email } })

  //     //BCRYPT DECRYPTION METHODS:
  //     const isPasswordValid = await User.compare(password, user!.password)
  
  //     if (isPasswordValid) {
  //       //AUTHENTICATION METHODS REQUIRED:
  //       return user
        

  //     } else {
  //       const response = {"message": "Incorrect password"}
  //       return response
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  
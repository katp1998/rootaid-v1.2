import { User } from '../models/user.models';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'


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
  export const createUser = async ({name, email, password}: any) => { //types to be tested in integration between service and controller files
    //CHECK IF USER EXISTS
    const userExists = findUser({email})
    
    if(!userExists){
      try {
        //GENERATE THE HASHED PASSWORD TO BE STORED IN THE DATABASE:
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        //CREATE USER:
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
        })
        //RETURN SUCCESS RESPONSE
        const response = {"status": "success", "user": {"name": user.name, "email": user.email}}
        return response

      } catch (error) {
        console.log(error)
        //RETURN UNSUCCESSFUL RESPONSE
        const response = {"status": "error", "messsage": "User creation unsuccessful"}
        return response
      }
    }else{
      const response = {"message": "User exists, please login"}
      return response
    }

}
  
  //@desc LOGIN
  //@route GET /api/v1.2/auth/login
  export const loginUser = async ({email, password} : any) => {
    try {
      //CHECK IF USER EXISTS
      const userExists = findUser({email})

      if (!userExists) {
        const response = { "status": "error", "message": "User does not have an account, please Sign up" }
        return response
      }

      const user = await User.findOne({ where: { email } })

      //BCRYPT DECRYPTION METHODS:
      const isPasswordValid = await bcrypt.compare(password, user!.password)
  
      if (isPasswordValid) {
        //AUTHENTICATION METHODS REQUIRED:
        const response = {"message": "Login successful"}
        return response
        

      } else {
        const response = {"message": "Incorrect password"}
        return response
      }
    } catch (error) {
      console.log(error)
    }
  }
  
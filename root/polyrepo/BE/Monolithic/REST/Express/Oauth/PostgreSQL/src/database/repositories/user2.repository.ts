//without using typeorm
import { Request, response, Response } from 'express';
import { pool } from '../connection';
import { QueryResult } from 'pg';
import { getUserInfoQuery, createUserQuery, checkIfEmailExists } from '../queries/user.queries';
import bcrypt from 'bcrypt'

//@DESC: FIND IF USER EXISTS
//@ROUTE: POST /api/v1.2/auth/
export const findUser =async (email:any) => {
    //CHECK IF USER WITH SAME EMAIL ADDRESS EXISTS
    try {
      const existingUser = await pool.query(checkIfEmailExists, [email])
      if(existingUser){
        const response = {"message": "User exists, please try logging in"}
        return response
      } else{
        return existingUser
      }
      }
    catch (error) {
      console.log(error)
    }
  }

//@desc: CREATE USER
//@route: /api/v1.2/auth/create
export const createUser = async ({ name, email, password }: { name:string, email:string, password:string }) => {
    //CHECK IF USER EXISTS:
    const userExists = findUser({email})

    if(!userExists){
        try {
            //GENERATE THE HASHED PASSWORD TO BE STORED IN THE DATABASE:
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            //CREATE USER:
            const user = await pool.query(createUserQuery, [name, email, password = hashedPassword]);
            //RETURN SUCCESS RESPONSE
            const response = {"status": "success", user}
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
};

//@desc: LOGIN USER
//@route: /api/v1.2/auth/login
export const loginUser = async ({email, password} : any) => {
    try {
        //CHECK IF USER EXISTS
        const userExists = findUser({email})
  
        if (!userExists) {
          const response = { "status": "error", "message": "User does not have an account, please Sign up" }
          return response
        }
        else{
            const userPassword = await pool.query('SELECT password FROM users WHERE email = $1', [email])
  
            //BCRYPT DECRYPTION METHODS:
            const isPasswordValid = await bcrypt.compare(password, userPassword as any)

            if (isPasswordValid) {
              //AUTHENTICATION METHODS REQUIRED:
                /**
                 * 
                 * 
                 */
              const response = {"message": "Login successful"}
              return response

            } else {
              const response = {"message": "Incorrect password"}
              return response
            }
        }

        
      } catch (error) {
        console.log(error)
      }
};
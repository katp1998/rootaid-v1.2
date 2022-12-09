
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import aws from "aws-sdk"

//using documentclient method 
const db = new aws.DynamoDB.DocumentClient()

//creating a constant with the table name
// export const User = process.env.TABLE_NAME

//@DESC: FIND IF USER EXISTS
//@ROUTE: POST /api/v1.2/auth/
export const findUser =async (email:any) => {
  //CHECK IF USER WITH SAME EMAIL ADDRESS EXISTS
  const params ={
    TableName: "rootaid-v1.2-test",
    key: {
      email
    }
  }
  if(params){
    return params
  }
}
  
  //@desc CREATING USER
  //@route POST /api/v1.2/auth/create
  export const createUser = async ({name, email, password}: any) => {
    //CHECK IF USER EXISTS
    const userExists = findUser({email})
    
    if(!userExists){
      try {
        //GENERATE THE HASHED PASSWORD TO BE STORED IN THE DATABASE:
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        //CREATE USER:
        const params = {
          TableName: "rootaid-v1.2-test",
          Item: {name, email, password: hashedPassword}
      }
        //RETURN SUCCESS RESPONSE
        await db.put(params).promise()
        return { success: true }

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
    //CHECK IF USER EXISTS
    const userExists = findUser({email})
    if(userExists){
      
    }
    try {
      

    }catch(error){}
  }
  
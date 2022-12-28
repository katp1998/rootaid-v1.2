import { Document } from "mongoose";

export interface IUser extends Document {
  name: string
  email: string
  password: string
  refreshToken: string
}

export interface IUserInputs {
  name?:string,
  email:string,
  password:string
}

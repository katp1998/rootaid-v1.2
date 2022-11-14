import { model, Schema } from "mongoose";
import { IUser } from '../types/user.type'

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
  
});

export default model<IUser>("User", userSchema);
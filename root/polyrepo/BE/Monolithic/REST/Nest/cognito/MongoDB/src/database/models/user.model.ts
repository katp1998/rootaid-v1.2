// import { model, Schema } from "mongoose";
// import { IUser } from '../types/user.type'

// const userSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   refreshToken : {default: '',  type: String, required:false}
  
// });

// export default model<IUser>("User", userSchema);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  _id: ObjectId;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
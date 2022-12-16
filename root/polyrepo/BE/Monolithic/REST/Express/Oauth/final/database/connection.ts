import mongoose from "mongoose";

export const connection = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://Thanistas:sample@cluster0.m8mer.mongodb.net/Rootaid_sample?retryWrites=true&w=majority");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

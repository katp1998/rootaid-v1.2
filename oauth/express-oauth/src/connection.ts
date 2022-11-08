import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const mongouri = process.env.MONGO_URI as string

export const connection = async () => {
  try {
    const conn = await mongoose.connect(mongouri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


import aws from 'aws-sdk'
require("dotenv").config();

//configuration with environment variables
export const connection = () => {
  try {
    aws.config.update({
      region: process.env.AWS_DEFAULT_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
    });
    console.log("Database successfully connected");
  } catch (error) {
    console.log("Database connection unsuccessful");
  }
};



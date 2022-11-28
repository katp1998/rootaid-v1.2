import * as dynamoose from "dynamoose";
import * as dotenv from 'dotenv'

dotenv.config()
// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
     secretAccessKey: process.env.SECRECT_ACCESS_KEY_ID,
      accessKeyId: process.env.ACCESS_KEY_ID,
    },
    region: process.env.REGION
});

// Set DynamoDB instance to the Dynamoose DDB instance
export const DynamoDB = dynamoose.aws.ddb.set(ddb);
import * as dynamoose from "dynamoose";
import * as dotenv from 'dotenv'

dotenv.config()
// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
        secretAccessKey: process.env.SECRECT_ACCESS_KEY_ID || '9oX1Hf/GzVR/eRsVH8bkzRyRpyQL0Ez/sAwJFNxM',
      accessKeyId: process.env.ACCESS_KEY_ID || 'AKIAYJAUQPODAL2GVCBT',
    },
    region: process.env.REGION
});

// Set DynamoDB instance to the Dynamoose DDB instance
export const DynamoDB = dynamoose.aws.ddb.set(ddb);

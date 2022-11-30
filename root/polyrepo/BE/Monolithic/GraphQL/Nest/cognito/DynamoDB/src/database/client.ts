import * as dynamoose from "dynamoose";
import * as dotenv from 'dotenv'
dotenv.config()

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
      secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
      accessKeyId: process.env.DYNAMODB_ACCESS_KEY,
    },
    region: process.env.REGION
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

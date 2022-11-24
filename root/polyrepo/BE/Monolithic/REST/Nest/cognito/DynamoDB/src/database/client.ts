// import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
// import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

// const dynamoClient = new DynamoDBClient({
//     region: process.env.COGNITO_REGION,
    
// })

// const docClient = DynamoDBDocumentClient.from(dynamoClient)

// export default docClient

import * as dynamoose from "dynamoose";
import * as dotenv from 'dotenv'
dotenv.config()

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
      secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
      accessKeyId: process.env.DYNAMODB_ACCESS_KEY,
    },
    region: "us-east-1"
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

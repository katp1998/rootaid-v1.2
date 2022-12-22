import * as dynamoose from "dynamoose";
import config from '../config'

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
      secretAccessKey: config.ddbSecret,
      accessKeyId: config.ddbAccessKey,
    },
    region: process.env.AWS_REGION
});

// Set DynamoDB instance to the Dynamoose DDB instance
export const setDdb = () => {
  dynamoose.aws.ddb.set(ddb);
}


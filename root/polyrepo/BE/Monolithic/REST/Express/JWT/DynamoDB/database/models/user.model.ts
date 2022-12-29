import * as dynamoose from "dynamoose";


import config from '../../config'

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
      secretAccessKey: `${config.dynamoSecretKey}`,
      accessKeyId: `${config.dynamoAccessKey}`,
    },
    region: `${config.region}`
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);


const schema = new dynamoose.Schema({
    "id": String,
    "name": String,
    "email": String,
    "password": String,
    "refreshToken": String

}, {
    "saveUnknown": true,
    "timestamps": true
});

export const User = dynamoose.model("User", schema);
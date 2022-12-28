import * as dynamoose from "dynamoose";

const schema = new dynamoose.Schema({
    "userid": String,
    "name": String,
    "email": String,
    "password": String,
    "refreshToken":String

}, {
    "saveUnknown": true,
    "timestamps": true
});

export const User = dynamoose.model("nestjs", schema);
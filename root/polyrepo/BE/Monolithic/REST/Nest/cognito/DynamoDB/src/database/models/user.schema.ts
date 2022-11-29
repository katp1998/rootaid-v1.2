import * as dynamoose from "dynamoose";

const schema = new dynamoose.Schema({
    "id": String,
    "username": String,
    "email": String,
    "password": String,

}, {
    "saveUnknown": true,
    "timestamps": true
});

export const User = dynamoose.model("User", schema);

//Initializing CognitoExpress constructor
export const cognitoExpress = new CognitoExpress({
    region: "us-east-1",
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse: "id", //Possible Values: access | id
    tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
  });

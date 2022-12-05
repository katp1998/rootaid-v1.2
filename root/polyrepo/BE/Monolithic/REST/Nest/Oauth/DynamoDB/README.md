# # Dependencies

### DynamoDB

- yarn add dynamoose
- yarn add uuid

### Oauth

- yarn add @nestjs/passport
- yarn add passport
- yarn add passport-google-oauth20
- yarn add @nestjs/config
- yarn add --dev @types/passport-google-oauth20
- yarn add express-session
- yarn add --dev @types/express-session

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GOOGLE_CLIENT_ID`= Your Oauth Client ID

`GOOGLE_CLIENT_SECRET`= Your Oauth Client Secret

`GOOGLE_REDIRECT_URL`= Your server redirect URL

`SESSION_SECRET`= Your session secret

`REGION`= Your DynamoDB region

`ACCESS_KEY_ID`= Your Role access key

`SECRECT_ACCESS_KEY_ID`= Your Role secret access key

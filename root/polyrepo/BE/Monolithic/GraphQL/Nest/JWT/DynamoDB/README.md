# # Dependencies

### Graphql

- yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express

### DynamoDB

- yarn add dynamoose
- yarn add uuid

### jwt

- yarn add @nestjs/passport passport passport-local
- yarn add --dev @types/passport-local
- yarn add @nestjs/jwt passport-jwt
- yarn add --dev @types/passport-jwt

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REGION`= Your DynamoDB region

`ACCESS_KEY_ID`= Your Role access key

`SECRECT_ACCESS_KEY_ID`= Your Role secret access key

`JWT_SECRET_KEY`= Your jwt secret

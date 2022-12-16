# # Dependencies

### mongoDB

- yarn add @nestjs/mongoose
- yarn add mongoose

### keycloak

- yarn add nest-keycloak-connect
- yarn add @nestjs/axios
- yarn add qs
- yarn add @nestjs/config
- yarn add keycloak-connect
- yarn add cookie-parser

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`= Your MongoDB URL

`DATABASE_NAME`= Your Database

`AUTH_SEVER_URL`= Keycloak base url

`REALM`=Your Keycloak realm

`CLIENT_ID`= Project client

`SECRET_ID`= Project client's secret id

`TOKEN_CLIENT_ID`= Admin cli

`TOKEN_SECRET_ID`= Admin cli secret id

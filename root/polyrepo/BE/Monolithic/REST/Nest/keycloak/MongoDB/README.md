# # Dependencies

### mongoDB

- yarn add typeorm
- yarn add @nestjs/typeorm
- yarn add mongodb

### keycloak

- npm install nest-keycloak-connect –save
- npm i --save @nestjs/axios
- npm i qs
- npm i --save @nestjs/config
- npm i keycloak-connect

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

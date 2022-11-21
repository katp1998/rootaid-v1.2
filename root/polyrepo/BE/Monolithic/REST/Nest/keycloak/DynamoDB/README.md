# # Dependencies

### dynamoDB

- yarn add aws-sdk
- yarn add --dev @types/uuid

### Keycloak

- yarn add nest-keycloak-connect –save
- yarn add @nestjs/axios
- yarn add qs
- yarn add @nestjs/config
- yarn add keycloak-connect

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REGION`= Your dynamoDB region

`ACCESS_KEY_ID`= Your dynamoDB access key ID

`SECRECT_ACCESS_KEY_ID`= Your dynamoDB secrect access key ID

`AUTH_SEVER_URL`= Keycloak base url

`REALM`=Your Keycloak realm

`CLIENT_ID`= Project client

`SECRET_ID`= Project client's secret id

`TOKEN_CLIENT_ID`= Admin cli

`TOKEN_SECRET_ID`= Admin cli secret id

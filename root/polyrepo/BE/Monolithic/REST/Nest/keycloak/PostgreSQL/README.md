# # Dependencies

### Postgres

- yarn add @nestjs/typeorm
- yarn add typeorm
- yarn add pg
- yarn add @nestjs/config

### Keycloak

- yarn add nest-keycloak-connect –save
- yarn add @nestjs/axios
- yarn add qs
- yarn add @nestjs/config
- yarn add keycloak-connect

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`POSTGRESQL_HOST`= Your Postgres Host

`POSTGRESQL_PORT`= Your Postgres port

`POSTGRESQL_USERNAME`= Your Postgres username

`POSTGRESQL_PASSWORD`= Your Postgres password

`POSTGRESQL_DATABASE`= Your database name

`AUTH_SEVER_URL`= Keycloak base url

`REALM`=Your Keycloak realm

`CLIENT_ID`= Project client

`SECRET_ID`= Project client's secret id

`TOKEN_CLIENT_ID`= Admin cli

`TOKEN_SECRET_ID`= Admin cli secret id

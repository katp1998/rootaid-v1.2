# # Dependencies

### GrapgQL

- yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express

### Postgres

- yarn add @nestjs/typeorm
- yarn add typeorm
- yarn add pg
- yarn add @nestjs/config

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

`POSTGRESQL_HOST`= Your Postgres Host

`POSTGRESQL_PORT`= Your Postgres port

`POSTGRESQL_USERNAME`= Your Postgres username

`POSTGRESQL_PASSWORD`= Your Postgres password

`POSTGRESQL_DATABASE`= Your database name

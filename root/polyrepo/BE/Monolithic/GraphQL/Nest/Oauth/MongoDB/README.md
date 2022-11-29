# # Dependencies

### GrapgQL

- yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express

### mongoDB

- yarn add typeorm
- yarn add @nestjs/typeorm
- yarn add mongodb

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

`DATABASE_URL`= Your MongoDB URL

`DATABASE_NAME`= Your Database

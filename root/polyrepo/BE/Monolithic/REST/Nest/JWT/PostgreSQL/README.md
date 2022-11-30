# # Dependencies

### Postgres

- yarn add @nestjs/typeorm
- yarn add typeorm
- yarn add pg
- yarn add @nestjs/config

### jwt

- yarn add @nestjs/passport passport passport-local
- yarn add --dev @types/passport-local
- yarn add @nestjs/jwt passport-jwt
- yarn add --dev @types/passport-jwt

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`POSTGRESQL_HOST`= Your Postgres Host

`POSTGRESQL_PORT`= Your Postgres port

`POSTGRESQL_USERNAME`= Your Postgres username

`POSTGRESQL_PASSWORD`= Your Postgres password

`POSTGRESQL_DATABASE`= Your database name

`JWT_SECRET`= Your jwt secret

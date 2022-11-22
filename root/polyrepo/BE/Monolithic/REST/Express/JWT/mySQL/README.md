
This is the boilerplate generated for express-mySQL combination.

Prerequisties:
- mySQL server installed

Dependencies:
- TypeORM
This dependency is added to access Databases with ease, without using complex queries. This is a slow approach in comparison to using mySQL queries

To configure prettier and eslint-airbnb-config-typescript:
    1. Install the following dependencies:
        yarn add @typescript-eslint/eslint-plugin eslint eslint-config-airbnb-base eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-prettier prettier --dev
    2. Run:
        yarn run lint
    3. Run:
        yarn run lint --fix
    4. Fix the remaining errors manually
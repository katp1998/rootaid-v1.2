import express , {Express, request, Request,Response} from 'express';
import {graphqlHTTP} from 'express-graphql';

import cors from 'cors';
import bodyparser from 'body-parser';

import connection from './database/connection';

import config from './config';
import { schema } from './graphql/typeDefs';
import { resolver } from './graphql/resolvers';


const app : Express = express();

connection();

app.use(cors());
app.use(express.json());
app.use((bodyparser.urlencoded({extended: true})));

app.use(
    '/graphql',
    graphqlHTTP({
        schema : schema,
        rootValue: resolver,
        graphiql : true
        //context: ({req}) =>({req})
    })
)


app.listen(config.port, ()=>{
    console.log(`Server running at ${config.port}`)
})

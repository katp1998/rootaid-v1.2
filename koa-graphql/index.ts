import koa from 'koa';
import mount from 'koa-mount';
import cors from '@koa/cors'
import json from 'koa-json';
import bodyParser from 'koa-bodyparser'
import { graphqlHTTP } from 'koa-graphql';



import connection from './database/connection';

import config from './config';
import { schema } from './graphql/typeDefs';
import { resolver } from './graphql/resolvers';


const app = new koa();

connection();

app.use(cors());
app.use(json());
app.use(bodyParser());

app.use(
    mount(
        '/graphql',
        graphqlHTTP({
            schema : schema,
            rootValue : resolver,
            graphiql : true
        })
    )
)


app.listen(config.port, ()=>{
    console.log(`Server running at ${config.port}`)
})

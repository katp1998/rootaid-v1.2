import express , {Express} from 'express';
import {graphqlHTTP} from 'express-graphql';
import cors from 'cors';
import bodyparser from 'body-parser';
import config from './config';
import { schema } from './graphql/typeDefs';
import { resolver } from './graphql/resolvers';
import { connection } from './database/connection';
import { configureKeycloak } from './config/keycloak-config';
import {KeycloakContext} from 'keycloak-connect-graphql'

const graphqlPath = '/graphql'


const app : Express = express();

// Config Keycloak
configureKeycloak(app, graphqlPath)

app.use(cors());
app.use(express.json());
app.use((bodyparser.urlencoded({ extended: true })));

//CONNECTING TO DATABASE:
connection.then(() =>
    console.log('Database connected'))
    .catch(
        (error) =>
            console.log(error, 'Database connection unsuccessful')
    );

app.use(
    graphqlPath,
    graphqlHTTP({
        schema: schema,
        rootValue: resolver,
        graphiql: true,
        context: (req :any) => {
            return {
                kauth: new KeycloakContext({ req: req as any })
            }
        }
    })
)


app.listen(config.port, ()=>{
    console.log(`Server running at ${config.port}`)
})

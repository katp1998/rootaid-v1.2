import {buildSchema} from 'graphql'

export const schema = buildSchema(`
    type Query {
        login(email:String!,password:String!) : AuthPayload
    }
    type Mutation {
        register(name:String!,email:String!,password:String!) : AuthPayload
    }
    type User {
        id: ID!
        name: String!
        email: String!
        token: String
    }
    type AuthPayload {
        token: String!
        id: ID!
    }
`);

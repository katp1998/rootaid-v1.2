import { buildSchema } from 'graphql'

export const schema = buildSchema(`
    type Query {
        login(name:String!,password:String!) : AuthPayload!,
        protect: ProtectRoute
    }
    type Mutation {
        register(name:String!,email:String!,password:String!) : RegisterPayload 
        
    }
    type User {
        id: ID!
        name: String!
        email: String!
    }
    type AuthPayload {
        access_token: String!
        user:User
    }

    type RegisterPayload{
        user:User,
        message: String
    }

    type ProtectRoute{
        message: String
    }
`);




import { gql } from 'apollo-server'

export default gql`
  directive @user on FIELD_DEFINITION

  type Mutation {
    signup(email: String!, password: String!): AuthResolver
    signin(email: String!, password: String!): AuthResolver
  }

  type Query {
    me: AuthResolver @user
  }

  type AuthResolver {
    user: User
    token: String
  }

  type User {
    id: ID!
    email: String!
    posts: [Post!]!
  }
`

import gql from 'graphql-tag'

export default gql`
  type Query {
    token: String
    profile: String
    isAuth: Boolean
  }

  type Mutation {
    setAuth(token: ID!, user: User!): Boolean!
    resetAuth: Boolean!
  }

  type User {
    id: ID!
    email: String
  }
`

import { gql } from 'apollo-server'

export default gql`
  extend type Mutation {
    createPost(body: String!): Post @user
    updatePost(postID: ID!, body: String!): Post @user
    deletePost(postID: ID!): Post @user
    commentAPost(postID: ID!, body: String): Post @user
  }

  extend type Query {
    posts: [Post!]!
  }

  type Post {
    id: ID!
    body: String!
    user: User!
    comments: [Comment!]
  }

  type Comment {
    id: ID!
    user: User!
    body: String!
  }
`

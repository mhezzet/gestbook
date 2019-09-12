import { makeExecutableSchema } from 'apollo-server'
import schemaDirectives from '../directives'
import { userResolvers, userTypeDefs, User } from './User'
import { postResolvers, postTypeDefs, Post } from './Post'

export const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, postTypeDefs],
  resolvers: [userResolvers, postResolvers],
  schemaDirectives
})

export const models = {
  User,
  Post
}

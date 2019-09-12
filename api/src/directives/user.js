import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server'
import { defaultFieldResolver } from 'graphql'

export default class UserDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = function(...args) {
      const [_, __, { user }] = args
      if (!user)
        throw new AuthenticationError('Access denied, you are not a user')

      return resolve.apply(this, args)
    }
  }
}

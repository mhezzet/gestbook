import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import defaults from './defaults'
import config from '../config.json'
export * from './actions'

export const client = new ApolloClient({
  uri: config.SERVER_HOST,
  request: operation => {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  },
  clientState: {
    resolvers,
    typeDefs,
    defaults
  }
})

export default function({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

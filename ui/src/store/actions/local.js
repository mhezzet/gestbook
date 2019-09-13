import gql from 'graphql-tag'

export const GET_AUTH = gql`
  query {
    isAuth @client
    token @client
    profile @client
  }
`

export const SET_AUTH = gql`
  mutation setAuth($token: ID!, $user: user!) {
    setAuth(token: $token, user: $user) @client
  }
`

export const RESET_AUTH = gql`
  mutation {
    resetAuth @client
  }
`

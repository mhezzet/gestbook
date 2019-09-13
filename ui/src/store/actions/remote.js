import gql from 'graphql-tag'

/**
|--------------------------------------------------
| signup
|--------------------------------------------------
*/
export const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
        id
        email
      }
      token
    }
  }
`

/**
|--------------------------------------------------
| signin
|--------------------------------------------------
*/
export const SIGN_IN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        id
        email
      }
      token
    }
  }
`

/**
|--------------------------------------------------
| signin
|--------------------------------------------------
*/
export const POSTS = gql`
  query posts {
    posts {
      id
      body
      user {
        id
        email
      }
      comments {
        id
        user {
          id
          email
        }
        body
      }
    }
  }
`

/**
|--------------------------------------------------
| createPost
|--------------------------------------------------
*/

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      user {
        id
        email
      }
      comments {
        id
        body
        user {
          id
          email
        }
      }
    }
  }
`

/**
|--------------------------------------------------
| updatePost
|--------------------------------------------------
*/

export const UPDATE_POST = gql`
  mutation updatePost($postID: ID!, $body: String) {
    updatePost(postID: $postID, body: $body) {
      id
      body
      user {
        id
        email
      }
      comments {
        id
        body
        user {
          id
          email
        }
      }
    }
  }
`

/**
|--------------------------------------------------
| delete a post
|--------------------------------------------------
*/

export const DELETE_POST = gql`
  mutation deletePost($postID: ID!) {
    deletePost(postID: postID) {
      id
      body
      user {
        id
        email
      }
    }
  }
`

/**
|--------------------------------------------------
| comment a post
|--------------------------------------------------
*/

export const COMMENT_A_POST = gql`
  mutation commentAPost($postID: ID!, $body: String!) {
    commentAPost(postID: postID) {
      id
      body
      user {
        id
        email
      }
      comments {
        id
        body
        user {
          id
          email
        }
      }
    }
  }
`

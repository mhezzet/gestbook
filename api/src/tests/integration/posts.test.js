/* eslint-disable no-undef */
import { createTestClient } from 'apollo-server-testing'
import gql from 'graphql-tag'
import server from '../../index'
import Post from '../../modules/Post/model'
import User from '../../modules/User/model'

const { query, mutate } = createTestClient(server)

describe('posts module', () => {
  afterEach(async () => {
    await Post.remove({})
    await User.remove({})
  })

  describe('mutation: createPost', () => {
    it('should create a post', async () => {
      const { data } = await mutate({
        mutation: SIGN_UP,
        variables: { email: 'test@test.tst', password: '1234' }
      })

      const token = data.signup.token
      const user = data.signup.user
      const body = 'iam a new post'

      console.log(token)

      const res = await mutate({
        mutation: CREATE_POST,
        variables: { body },
        http: {
          headers: { authorization: token }
        }
      })

      console.log(res.data)
      console.log(res.errors)
      // console.log(create)
      // console.log(createError)
    })

    it('should push the postid to user instance', () => {})
  })

  describe('query: posts', () => {
    it('should get all posts', async () => {
      await Post.collection.insertMany([
        {
          body: 'iam a good body',
          comments: [{ body: 'iam a good body' }, { body: 'iam a good body' }]
        },
        {
          body: 'iam a good body',
          comments: [{ body: 'iam a good body' }, { body: 'iam a good body' }]
        }
      ])

      const { data, errors } = await query({ query: POSTS })

      expect(data.posts.length).toBe(2)
      expect(
        data.posts.some(post => post.body === 'iam a good body')
      ).toBeTruthy()
    })
  })
})

const POSTS = gql`
  query posts {
    posts {
      body
      comments {
        body
      }
    }
  }
`

const SIGN_UP = gql`
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

const CREATE_POST = gql`
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

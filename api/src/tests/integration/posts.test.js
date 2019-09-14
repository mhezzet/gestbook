/* eslint-disable no-undef */
import { createTestClient } from 'apollo-server-testing'
import gql from 'graphql-tag'
import server from '../../index'
import Post from '../../modules/Post/model'

const { query, mutate } = createTestClient(server)

describe('posts module', () => {
  afterEach(async () => {
    await Post.remove({})
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

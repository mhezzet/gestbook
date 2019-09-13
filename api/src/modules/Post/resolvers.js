import { UserInputError, AuthenticationError, ApolloError } from 'apollo-server'
import { createPostValidator } from './validation'

async function createPost(
  _,
  args,
  { models: { Post, User }, user: requester }
) {
  //validate the input schema
  await createPostValidator(args)

  //create post
  const post = await Post.create({ ...args, user: requester.id })

  console.log(post)

  //add the post to user instance
  const user = await User.findOneAndUpdate(
    { _id: requester.id },
    {
      $push: { posts: post._id }
    },
    {
      new: true
    }
  )
  console.log(user)

  return post
}

async function posts(_, __, { models: { Post } }) {
  const posts = await Post.find()
  return posts
}

export default {
  Mutation: { createPost },
  Query: { posts }
}

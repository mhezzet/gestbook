import { UserInputError, AuthenticationError, ApolloError } from 'apollo-server'
import { createPostValidator, updatePostValidator } from './validation'

async function createPost(
  _,
  args,
  { models: { Post, User }, user: requester }
) {
  //validate the input schema
  await createPostValidator(args)

  //create post
  const post = await Post.create({ ...args, user: requester.id })

  //add the post to user instance
  await User.findOneAndUpdate(
    { _id: requester.id },
    { $push: { posts: post._id } }
  )

  return post
}

async function updatePost(_, args, { models: { Post }, user: requester }) {
  //validate the input schema
  await updatePostValidator(args)

  //check if the post exist
  const post = await Post.findOne({ _id: args.postID })
  if (!post) throw new UserInputError('there is no such a post')

  //check if the post belongs to requester
  if (post.user != requester.id)
    throw new UserInputError('you have no privilege updating that post')

  //update post
  if (args.title) post.title = args.title
  if (args.body) post.body = args.body
  await post.save()

  return post
}

async function posts(_, __, { models: { Post } }) {
  const posts = await Post.find()
  return posts
}

export default {
  Mutation: { createPost, updatePost },
  Query: { posts }
}

import { UserInputError, AuthenticationError } from 'apollo-server'
import {
  createPostValidator,
  updatePostValidator,
  deletePostValidator,
  commentAPostValidator
} from './validation'

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

  await Post.populate(post, 'user')

  return post
}

async function updatePost(_, args, { models: { Post }, user: requester }) {
  //validate the input schema
  await updatePostValidator(args)

  //check if the post exist
  const post = await Post.findOne({ _id: args.postID }).populate(
    'user comments.user'
  )
  if (!post) throw new UserInputError('there is no such a post')

  //check if the post belongs to requester
  if (post.user.id != requester.id)
    throw new AuthenticationError('you have no privilege updating this post')

  //update post
  post.body = args.body
  await post.save()

  return post
}

async function deletePost(
  _,
  args,
  { models: { Post, User }, user: requester }
) {
  //validate the input schema
  await deletePostValidator(args)

  //check if the post exist
  const post = await Post.findOne({ _id: args.postID }).populate(
    'user comments.user'
  )
  if (!post) throw new UserInputError('there is no such a post')

  //check if the post belongs to requester
  if (post.user.id != requester.id)
    throw new AuthenticationError('you have no privilege deleting this post')

  //delete post
  await post.delete()

  //remove post from user instace
  await User.findOneAndUpdate(
    { _id: requester.id },
    { $pull: { posts: post._id } }
  )

  return post
}

async function commentAPost(_, args, { models: { Post }, user: requester }) {
  //validate the input schema
  await commentAPostValidator(args)

  //check if the post exist and update it
  const post = await Post.findOneAndUpdate(
    { _id: args.postID },
    { $push: { comments: { user: requester.id, body: args.body } } },
    {
      new: true
    }
  ).populate('user comments.user')
  if (!post) throw new UserInputError('there is no such a post')

  return post
}

async function posts(_, __, { models: { Post } }) {
  const posts = await Post.find().populate('user comments.user')

  return posts
}

export default {
  Mutation: { createPost, updatePost, deletePost, commentAPost },
  Query: { posts }
}

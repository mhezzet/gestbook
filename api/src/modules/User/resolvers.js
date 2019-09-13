import { UserInputError, AuthenticationError } from 'apollo-server'
import { signupValidator } from './validation'

async function signup(_, args, { models: { User } }) {
  console.log(args)

  //validated inout schema
  await signupValidator(args)

  //check email uniqueness
  let user = await User.findOne({ email: args.email })
  if (user) throw new UserInputError('this email is already exist')

  //create user
  user = await User.create(args)

  //generate json web token
  const token = user.genToken()

  return { user, token }
}

export default {
  Mutation: {
    signup
  }
}

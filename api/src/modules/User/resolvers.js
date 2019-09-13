import { UserInputError, AuthenticationError } from 'apollo-server'
import { signupValidator, signinValidator } from './validation'

async function signup(_, args, { models: { User } }) {
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

async function signin(_, args, { models: { User } }) {
  //validated inout schema
  await signinValidator(args)

  //check email existance
  const user = await User.findOne({ email: args.email })
  if (!user) throw new AuthenticationError('invalid email or password')

  //check password correctness
  const validPassword = await user.validPassword(args.password)
  if (!validPassword) throw new AuthenticationError('invalid email or password')

  //generate token
  const token = user.genToken()

  return { user, token }
}

export default {
  Mutation: {
    signup,
    signin
  }
}

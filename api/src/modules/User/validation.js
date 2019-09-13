import * as yup from 'yup'

const email = yup
    .string()
    .email()
    .max(50)
    .min(4)
    .required(),
  password = yup
    .string()
    .max(1024)
    .min(4)
    .required()

export const signupValidator = input => {
  const schema = yup.object({
    email,
    password
  })

  return schema.validate(input)
}

export const signinValidator = input => {
  const schema = yup.object({
    email,
    password
  })

  return schema.validate(input)
}

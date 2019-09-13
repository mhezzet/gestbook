import * as yup from 'yup'

const title = yup
    .string()
    .max(50)
    .min(2)
    .required(),
  postBody = yup
    .string()
    .max(1024)
    .min(1)
    .required(),
  objectId = yup
    .string()
    .matches(/^[a-f\d]{24}$/i, 'not valid objectid')
    .required(),
  commentBody = yup
    .string()
    .max(500)
    .min(1)
    .required()

export const createPostValidator = input => {
  const schema = yup.object({
    title,
    body: postBody
  })

  return schema.validate(input)
}

export const updatePostValidator = input => {
  const schema = yup.object({
    postID: objectId,
    title: yup
      .string()
      .max(50)
      .min(2),
    body: yup
      .string()
      .max(1024)
      .min(1)
  })

  return schema.validate(input)
}

export const deletePostValidator = input => {
  const schema = yup.object({
    postID: objectId
  })

  return schema.validate(input)
}

export const commentAPostValidator = input => {
  const schema = yup.object({
    postID: objectId,
    body: commentBody
  })

  return schema.validate(input)
}

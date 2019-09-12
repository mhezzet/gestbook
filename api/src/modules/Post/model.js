import { Schema, model } from 'mongoose'

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    body: {
      type: String,
      maxlength: 500,
      minlength: 1,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const postSchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 50,
      minlength: 2,
      trim: true,
      required: true
    },
    body: {
      type: String,
      maxlength: 1024,
      minlength: 1,
      trim: true,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    comments: [addressSchema]
  },
  {
    timestamps: true
  }
)

export default model('post', postSchema)

import { Schema, model } from 'mongoose'

const commentSchema = new Schema(
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
    comments: [commentSchema]
  },
  {
    timestamps: true
  }
)

export default model('post', postSchema)

import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import config from 'config'
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      maxlength: 50,
      minlength: 4,
      lowercase: true,
      trim: true,
      unique: true,
      match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
      type: String,
      maxlength: 1024,
      minlength: 3
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'posts'
      }
    ]
  },
  {
    timestamps: true
  }
)

userSchema.methods.genToken = function() {
  return JWT.sign({ id: this._id }, config.get('JWT_SECRET'))
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

export default mongoose.model('user', userSchema)

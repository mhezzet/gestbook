import { ApolloServer } from 'apollo-server'
import config from 'config'
import JWT from 'jsonwebtoken'
import mongoose from 'mongoose'
import logger from './utils/logger'
import { schema, models } from './modules'

//apollo server config
const server = new ApolloServer({
  mocks: true,
  schema,
  context: ({ req }) => {
    let user
    const token = req.headers['authorization']
    try {
      user = JWT.verify(token, config.get('JWT_SECRET'))
    } catch (err) {
      user = null
    }
    return { models, user }
  },
  formatError: error => {
    if (
      error.extensions.code === 'INTERNAL_SERVER_ERROR' &&
      config.get('env') === 'producton'
    ) {
      logger.error(error)
      delete error.extensions.exception
    }
    return error
  }
})

// database connection
mongoose
  .connect(config.get('DB_URI'), {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.info(`🎉 connected to ${config.get('env')} db`)
  })
  .catch(error => {
    logger.error(`${error}`)
  })

//apollo server startup
server
  .listen({ port: config.get('PORT') })
  .then(({ url }) => {
    logger.info(`💭 running env: ${config.get('env')}`)
    logger.info(`🚀 Server ready at ${url}`)
  })
  .catch(error => {
    logger.error('apollo server error', error)
  })

export default server

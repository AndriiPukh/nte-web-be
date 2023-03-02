import morgan from 'morgan'
import logger from '../utils/logger'
import config from '../configs/serverConfig'

const stream = {
  write: (message: string) => logger.http(message)
}
const skip = () => {
  return config.env !== 'development'
}

const morganMiddleware = morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms', {
  stream,
  skip
})

export default morganMiddleware

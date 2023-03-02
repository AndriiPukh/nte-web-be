import dotenv from 'dotenv'
import { DEFAULT_PORT } from './constants'
dotenv.config()

const config = {
  port: process.env['PORT'] || DEFAULT_PORT,
  env: process.env['NODE_ENV']
}

export default config

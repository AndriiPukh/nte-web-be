import dotenv from 'dotenv'
import { DEFAULT_PORT } from './constants'
dotenv.config()
const config = {
  port: process.env['PORT'] || DEFAULT_PORT,
  env: process.env['NODE_ENV'],
  db: {
    dbUser: process.env['MONGO_DB_USER'],
    dbPassword: process.env['MONGO_DB_PASSWORD'],
    dbName: process.env['MONGO_DB_CLUSTER']
  }
}
export default config

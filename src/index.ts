import http from 'http'
import app from './app'
import { mongoConnect } from './services/mongo'
import config from './configs/serverConfig'

const server = http.createServer(app)

const startServer = async () => {
  try {
    await mongoConnect()
    server.listen(config.port, () => {
      console.log(`Listening on port ${config.port}...`)
    })
  } catch (e) {
    throw e
  }
}

startServer().catch((e) => console.log(e, 'e'))

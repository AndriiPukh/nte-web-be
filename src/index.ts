import http from 'http'
import app from './app'
import config from './configs/serverConfig'

const server = http.createServer(app)
server.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`)
})

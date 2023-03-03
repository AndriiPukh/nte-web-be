import mongoose from 'mongoose'
import config from '../configs/serverConfig'

const { dbUser, dbName, dbPassword } = config.db

const mongoConnectionURL = `mongodb+srv://${dbUser}:${dbPassword}@${dbName}/?retryWrites=true&w=majority`
const connectionOptions = {
  maxPoolSize: 4
}
mongoose.set('strictQuery', false)
mongoose.set('debug', true)
export const mongoConnect = async () => {
  try {
    await mongoose.connect(mongoConnectionURL, connectionOptions)
  } catch (e) {
    throw e
  }
}

// TODO - uncomment it when needed
// export const mongoDisconnect = async () => {
//   try {
//     await mongoose.disconnect()
//   } catch (e) {
//     throw e
//   }
// }

import express, { Response, Request } from 'express'
import cors from 'cors'
import morganMiddleware from './middlewares/morgan.middleware'
import helmet from 'helmet'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: '*'
  })
)
app.use(morganMiddleware)
app.use(express.json())

app.get('/users', (_: Request, res: Response) => {
  res.status(200).json({ message: 'Hello Express!' })
})

export default app

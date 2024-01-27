import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { dbConnect } from './config/db'
import { router } from './routes'
import { errorHandler } from './handlers/errorHandler'
import { ApplicationError } from './utils/ApplicationError'

const PORT = process.env.PORT ?? 8000

const app = express()

app.use(express.json())
app.use(morgan('dev'))

const allowedDomains = [process.env.FRONTEND_URL]

app.use(
  cors({
    origin: function (origin, cb) {
      if (allowedDomains.indexOf(origin!) !== -1) {
        // Origin from request is allowed
        cb(null, true)
      } else {
        cb(new ApplicationError('Not allowed by CORS'))
      }
    }
  })
)

app.use('/api', router)

app.use(errorHandler)

dbConnect()

app.listen(PORT, () => {
  console.log(`Server development on port http://localhost:${PORT}`)
})

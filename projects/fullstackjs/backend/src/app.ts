import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import { dbConnect } from './config/db'
import { router } from './routes'
import { errorHandler } from './handlers/errorHandler'

const PORT = process.env.PORT ?? 8000

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api', router)

app.use(errorHandler)

dbConnect()

app.listen(PORT, () => {
  console.log(`Server development on port http://localhost:${PORT}`)
})

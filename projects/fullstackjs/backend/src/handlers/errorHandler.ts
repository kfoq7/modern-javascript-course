import { Request, Response, NextFunction } from 'express'
import { Error as MongooseError } from 'mongoose'
import colors from 'picocolors'
import { ApplicationError } from '../utils/ApplicationError'

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(`${colors.red('[ERROR]:')} ${error.name} | ${error.message}`)

  if (error instanceof ApplicationError) {
    res.status(error.statusCode).json({
      ok: false,
      error: error.message,
      status: error.statusCode
    })
  }

  if (error instanceof MongooseError) {
    res.status(500).send({
      ok: false,
      error: error.message
    })
  }

  res.status(404).json({
    ok: false,
    error: error.message
  })
}

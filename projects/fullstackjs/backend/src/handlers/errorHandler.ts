import { Request, Response, NextFunction } from 'express'
import { Error as MongooseError } from 'mongoose'
import colors from 'picocolors'

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(`${colors.red('[ERROR]:')} ${error.message}`)

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

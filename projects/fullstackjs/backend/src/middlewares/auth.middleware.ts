import type { Request, Response, NextFunction } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { veterinarianModel } from '../models/Veterinarian'
import { ApplicationError } from '../utils/ApplicationError'

export const checkAuth = async (
  req: Request<unknown, unknown, unknown>,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if (!(authorization && authorization.startsWith('Bearer'))) {
    return next(new ApplicationError('There is not token or Bearer', 403))
  }

  try {
    const token = authorization.split(' ').pop()!
    const decoded = jwt.verify(token, process.env.JWT_TOKEN) as JwtPayload

    req.veterinarian = await veterinarianModel
      .findById(decoded.id)
      .select('-password -token -confirmed')
      .lean()

    return next()
  } catch (error) {
    return next(new ApplicationError('Token not valid', 401))
  }
}

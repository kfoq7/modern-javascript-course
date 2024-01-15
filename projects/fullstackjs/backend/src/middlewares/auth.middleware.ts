import type { Request, Response, NextFunction } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { veterinarianModel } from '../models/Veterinarian'

export const checkAuth = async (
  req: Request<unknown, unknown, unknown>,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if (!(authorization && authorization.startsWith('Bearer'))) {
    return next(new Error('There is not token or Bearer'))
  }

  try {
    const token = authorization.split(' ').pop()!
    const decoded = jwt.verify(token, process.env.JWT_TOKEN!) as JwtPayload

    const veterinarian = await veterinarianModel
      .findById(decoded.id)
      .select('-password -token -confirmed')
      .lean()

    if (!veterinarian) {
      return next(new Error('User not exist'))
    }

    req.veterinarian = veterinarian

    next()
  } catch (error) {
    return next(new Error('Token not valid'))
  }
}

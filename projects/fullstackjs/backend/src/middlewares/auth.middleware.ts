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
    next(new Error('There is not token or Bearer'))
    return
  }

  try {
    const token = authorization.split(' ').shift()!
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

    req.veterinarian = await veterinarianModel
      .findById(decoded.id)
      .select('-password -token -confirmed')
      .lean()

    next()
  } catch (error) {
    next(new Error('Token not valid'))
  }
}

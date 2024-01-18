import type { Request, Response, NextFunction } from 'express'
import { veterinarianModel } from '../models/Veterinarian'
import type { Veterinarian } from '../types'
import { compartePassword, encryptPassword, generateId } from '../utils'
import { generateJWT } from '../utils/generateJWT'
import { ApplicationError } from '../utils/ApplicationError'

export const register = async (
  req: Request<unknown, unknown, Veterinarian>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    const existUser = await veterinarianModel.findOne({ email })
    if (existUser) {
      throw new ApplicationError('Email already exist')
    }

    const hashPassword = encryptPassword(password)

    const veterinarian = await veterinarianModel.create({
      ...req.body,
      password: hashPassword
    })

    res.json({
      veterinarian
    })
  } catch (error) {
    next(error)
  }
}

export const profile = async (
  req: Request<unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { veterinarian } = req

    res.json({ profile: veterinarian })
  } catch (error) {
    next(error)
  }
}

export const verify = async (
  req: Request<{ token: string }, unknown, unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params

    const verifyUser = await veterinarianModel.findOne({ token })
    if (!verifyUser) {
      throw new ApplicationError('Token not valid', 401)
    }

    verifyUser.token = null
    verifyUser.confirmed = true
    await verifyUser.save()

    res.json({ msg: 'User has been verified successfully' })
  } catch (error) {
    next(error)
  }
}

export const authentication = async (
  req: Request<unknown, unknown, Pick<Veterinarian, 'email' | 'password'>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    const user = await veterinarianModel.findOne({ email })
    if (!user) {
      throw new ApplicationError('User not exist')
    }

    if (!user.confirmed) {
      throw new ApplicationError('Your account is not confirmed yet', 403)
    }

    if (compartePassword(password, user.password)) {
      throw new ApplicationError('Wrong password')
    }

    const token = generateJWT(user.id)

    res.json({
      token
    })
  } catch (error) {
    next(error)
  }
}

export const forgotPassword = async (
  req: Request<unknown, unknown, Veterinarian>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body

    const existUser = await veterinarianModel.findOne({ email })
    if (!existUser) {
      throw new ApplicationError('User not exist')
    }

    existUser.token = generateId()
    await existUser.save()

    res.json({ msg: 'We sent a email with the instruccions' })
  } catch (error) {
    next(error)
  }
}

export const verifyToken = async (
  req: Request<{ token: string }, unknown, unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params

    const tokenValid = await veterinarianModel.findOne({ token })
    if (!tokenValid) {
      throw new ApplicationError('Token not valid', 401)
    }

    res.json({ msg: 'Token valid and user exist' })
  } catch (error) {
    next(error)
  }
}

export const newPassword = async (
  req: Request<{ token: string }, unknown, { password: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params
    const { password } = req.body

    const veterianrian = await veterinarianModel.findOne({ token })
    if (!veterianrian) {
      throw new ApplicationError('There was an error', 400)
    }

    veterianrian.token = null
    veterianrian.password = password
    await veterianrian.save()

    res.json({ msg: 'Password has been changed successfully' })
  } catch (error) {
    next(error)
  }
}

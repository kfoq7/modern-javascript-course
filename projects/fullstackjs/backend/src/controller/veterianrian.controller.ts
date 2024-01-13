import type { Request, Response, NextFunction } from 'express'
import { veterinarianModel } from '../models/Veterinarian'
import { compartePassword, encryptPassword } from '../utils'
import { generateJWT } from '../utils/generateJWT'
import type { Veterinarian } from '../types'

export const register = async (
  req: Request<unknown, unknown, Veterinarian>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    const existUser = await veterinarianModel.findOne({ email })
    if (existUser) {
      throw new Error('Email already exist')
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
  _req: Request<unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({})
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
      throw new Error('Token not valid')
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
      throw new Error('User not exist')
    }

    if (!user.confirmed) {
      throw new Error('Your account is not confirmed yet')
    }

    if (compartePassword(password, user.password)) {
      throw new Error('Wrong password')
    }

    const token = generateJWT(user.id)

    res.json({
      token
    })
  } catch (error) {
    next(error)
  }
}

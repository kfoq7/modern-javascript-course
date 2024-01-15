import type { Request, Response, NextFunction } from 'express'
import type { Patient } from '../types'
import { patientModel } from '../models/Patient'
import { ApplicationError } from '../utils/ApplicationError'

export const addPatient = async (
  req: Request<unknown, unknown, Patient>,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await patientModel.create({
      ...req.body,
      veterinarian: req.veterinarian!._id
    })

    res.json({
      msg: 'Patiant saved',
      patient
    })
  } catch (error) {
    next(error)
  }
}

export const getPatients = async (
  req: Request<unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    const patients = await patientModel.find({ veterinarian: req.veterinarian })

    res.json({ patients })
  } catch (error) {
    next(error)
  }
}

export const getPatient = async (
  req: Request<{ id: string }, unknown, unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const patient = await patientModel.findById(id)
    if (!patient) {
      throw new ApplicationError('Patient does not exist')
    }

    if (patient.veterinarian._id.toString() !== req.veterinarian!._id.toString()) {
      throw new ApplicationError('Acction not valid', 403)
    }

    res.json({ patient })
  } catch (error) {
    next(error)
  }
}

export const updatePatient = async (
  req: Request<{ id: string }, unknown, Patient>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const patient = await patientModel.findById(id)
    if (!patient) {
      throw new ApplicationError('Patient does not exist')
    }

    if (patient.veterinarian._id.toString() !== req.veterinarian!._id.toString()) {
      throw new ApplicationError('Acction not valid', 403)
    }

    const updatedPatient = await patient.updateOne(req.body, { new: true })

    res.json({
      patient: updatedPatient
    })
  } catch (error) {
    next(error)
  }
}

export const deletePatient = async (
  req: Request<{ id: string }, unknown, unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const patient = await patientModel.findById(id)
    if (!patient) {
      throw new ApplicationError('Patient does not exist')
    }

    if (patient.veterinarian._id.toString() !== req.veterinarian!._id.toString()) {
      throw new ApplicationError('Acction not valid', 403)
    }

    await patient.deleteOne()

    res.json({
      msg: 'Patient has been removed'
    })
  } catch (error) {
    next(error)
  }
}

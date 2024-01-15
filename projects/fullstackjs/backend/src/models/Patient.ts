import { Schema, model } from 'mongoose'
import type { Patient } from '../types'

const patientSchema = new Schema<Patient>(
  {
    name: {
      type: String,
      required: true
    },
    propertary: {
      type: String,
      required: true
    },
    email: {
      type: String,
      rqeuired: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now()
    },
    symptomsDescription: {
      type: String,
      required: true
    },
    veterinarian: {
      type: Schema.Types.ObjectId,
      ref: 'veterinarian'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const patientModel = model<Patient>('patient', patientSchema)

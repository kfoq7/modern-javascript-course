import { Schema, model } from 'mongoose'
import type { Veterinarian } from '../types'
import { generateId } from '../utils'

const veterinarianSchema = new Schema<Veterinarian>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    phone: {
      type: String,
      default: null,
      trim: true
    },
    web: {
      type: String,
      default: null
    },
    token: {
      type: String,
      default: generateId()
    },
    confirmed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const veterinarianModel = model<Veterinarian>('veterinarian', veterinarianSchema)

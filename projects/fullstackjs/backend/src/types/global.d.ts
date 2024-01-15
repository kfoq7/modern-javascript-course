import { Veterinarian } from '.'

declare module 'express' {
  interface Request {
    veterinarian?: Veterinarian
  }
}

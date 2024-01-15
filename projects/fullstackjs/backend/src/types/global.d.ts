import { Veterinarian } from '.'

declare module 'express' {
  interface Request {
    veterinarian?: Veterinarian | null
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      MONGO_URI: string
      JWT_TOKEN: string
    }
  }
}

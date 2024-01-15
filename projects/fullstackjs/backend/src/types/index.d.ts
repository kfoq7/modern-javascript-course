export interface Veterinarian {
  _id: string
  name: string
  password: string
  email: string
  phone?: string | null
  web?: string | null
  token: string | null
  confirmed: boolean
}

export interface Patient {
  _id: string
  name: string
  propertary: string
  email: string
  date: Date
  symptomsDescription: string
  veterinarian: Veterinarian
}

export interface VeterinarianAuth extends Pick<Veterinarian, 'id' | 'email'> {
  email?: string
}

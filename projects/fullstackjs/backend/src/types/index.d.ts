export interface Veterinarian {
  name: string
  password: string
  email: string
  phone?: string | null
  web?: string | null
  token: string | null
  confirmed: boolean
}

export interface VeterinarianAuth extends Pick<Veterinarian, 'id' | 'email'> {
  email?: string
}

interface Veterinarian {
  name: string
  email: string
  password: string
}

interface VeterinarianRegister extends Veterinarian {
  repeatPassword: string
}

interface Alert {
  message: string
  error: boolean
}

interface Auth {
  email: string
  password: string
  token?: string | null
}

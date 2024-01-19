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

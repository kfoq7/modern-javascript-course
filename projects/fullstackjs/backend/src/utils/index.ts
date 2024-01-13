import bcrypt from 'bcrypt'

export const generateId = () => {
  return String(Date.now().toString(32) + Math.random().toString(32).substring(2))
}

export const encryptPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

export const compartePassword = (data: string, encrypted: string) => {
  return bcrypt.compareSync(data, encrypted)
}

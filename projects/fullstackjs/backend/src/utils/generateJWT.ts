import jwt from 'jsonwebtoken'

export const generateJWT = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN!, {
    expiresIn: '30d'
  })
}

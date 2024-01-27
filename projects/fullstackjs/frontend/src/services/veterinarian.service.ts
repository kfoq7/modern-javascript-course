import { clientAxios } from './axios'

export const regiserVeterinarian = async (data: Veterinarian) => {
  return await clientAxios.post('/veterinarian/register', data)
}

export const verifyAccount = async (id: string) => {
  return await clientAxios.get(`/veterinarian/verify/${id}`)
}

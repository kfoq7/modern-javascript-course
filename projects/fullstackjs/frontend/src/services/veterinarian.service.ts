import { clientAxios } from './axios'

export const regiserVeterinarian = async (data: Veterinarian) => {
  return await clientAxios.post('/veterinarian/register', data)
}

export const verifyAccount = async (id: string) => {
  return await clientAxios.get(`/veterinarian/verify/${id}`)
}

export const forgotPassword = async (email: string) => {
  return await clientAxios.post(`/veterinarian/forgot-password`, { email })
}

export const loginVeterinarian = async (user: Auth) => {
  return await clientAxios.post('/veterinarian/login', user)
}

export const getVeterinarianProfile = async (token?: string | null) => {
  return await clientAxios.get('/veterinarian/profile', {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

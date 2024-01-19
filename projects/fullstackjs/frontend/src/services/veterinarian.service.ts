import { axiosInstance } from './axios'

export const regiserVeterinarian = async (data: Veterinarian) => {
  return axiosInstance.post('/veterinarian/register', data)
}

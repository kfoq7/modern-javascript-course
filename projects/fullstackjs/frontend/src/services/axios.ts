import axios from 'axios'

const baseURL =
  import.meta.env.VITE_ENV === 'development'
    ? import.meta.env.VITE_API_DEV_URL
    : import.meta.env.VITE_API_URL

export const clientAxios = axios.create({
  baseURL
})

import { useState, createContext, useEffect } from 'react'
import { AxiosError } from 'axios'
import {
  loginVeterinarian,
  getVeterinarianProfile
} from '../services/veterinarian.service'

interface Props {
  children: React.ReactNode
}

interface AuthContext {
  auth: Partial<Auth>
  setAuth: React.Dispatch<React.SetStateAction<Auth>>
  alert: Alert
  login: () => Promise<void>
}

export const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<Auth>({ email: '', password: '' })
  const [alert, setAlert] = useState<Alert>({ message: '', error: false })

  const login = async () => {
    if (Object.values(auth).includes('')) {
      return setAlert({ message: '', error: true })
    }

    try {
      const { data } = await loginVeterinarian(auth)

      setAuth(data)
      localStorage.setItem('token', data.token)
    } catch (error) {
      if (error instanceof AxiosError) {
        return setAlert({ message: error.response?.data.msg, error: true })
      }
    }
  }

  useEffect(() => {
    const authenticUser = () => {
      const token = localStorage.getItem('token')
      if (token == null) return

      getVeterinarianProfile(token)
        .then(({ data }) => {
          setAuth(prev => ({ ...prev, ...data }))
        })
        .catch(error => {
          setAuth({ email: '', password: '' })

          if (error instanceof AxiosError) {
            setAlert({ message: error.response?.data.msg, error: true })
          }
        })
    }

    authenticUser()
  }, [auth])

  return (
    <AuthContext.Provider value={{ auth, alert, setAuth, login }}>
      {children}
    </AuthContext.Provider>
  )
}

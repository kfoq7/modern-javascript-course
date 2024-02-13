import { useState, createContext, useEffect } from 'react'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
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
  logout: () => void
  loading: boolean
}

export const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: Props) {
  const navigate = useNavigate()
  const [auth, setAuth] = useState<Auth>({ email: '', password: '' })
  const [alert, setAlert] = useState<Alert>({ message: '', error: false })
  const [loading, setLoading] = useState(true)

  const login = async () => {
    if (Object.values(auth).includes('')) {
      return setAlert({ message: '', error: true })
    }

    try {
      const { data } = await loginVeterinarian(auth)
      localStorage.setItem('token', data.token)

      navigate('/admin')
    } catch (error) {
      if (error instanceof AxiosError) {
        return setAlert({ message: error.response?.data.msg, error: true })
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAuth({ _id: '', email: '', password: '', token: '' })
  }

  useEffect(() => {
    const authenticUser = async () => {
      const token = localStorage.getItem('token')
      if (token == null) {
        return setLoading(false)
      }

      try {
        const { data } = await getVeterinarianProfile(token)
        setAuth(prev => ({ ...prev, ...data.profile }))
      } catch (error) {
        setAuth({ email: '', password: '' })

        if (error instanceof AxiosError) {
          setAlert({ message: error.response?.data.msg, error: true })
        }
      }

      setLoading(false)
    }

    authenticUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{ auth, alert, setAuth, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

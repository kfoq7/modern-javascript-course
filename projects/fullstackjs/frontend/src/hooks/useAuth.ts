import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export function useAuth() {
  const context = useContext(AuthContext)

  if (context == null) {
    throw new Error('useAuth must be used within a AuthContext')
  }

  return context
}

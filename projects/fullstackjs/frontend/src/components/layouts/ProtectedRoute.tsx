import { Outlet, Navigate } from 'react-router-dom'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { useAuth } from '../../hooks/useAuth'

export const ProtectedRoute = () => {
  const { auth, loading } = useAuth()

  if (loading) {
    return 'Loading...'
  }

  return (
    <>
      <Header />

      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}

      <Footer />
    </>
  )
}

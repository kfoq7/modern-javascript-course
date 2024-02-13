import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const Header = () => {
  const { logout } = useAuth()

  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col items-center justify-between lg:flex-row">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">
          Patients Administrator of{' '}
          <span className="text-white font-black">Veterinarian</span>
        </h1>

        <nav className="flex flex-col items-center gap-4 mt-5 lg:flex-row lg:mt-0">
          <Link to="/admin" className="text-white text-sm uppercase font-bold">
            Patient
          </Link>
          <Link to="/admin" className="text-white text-sm uppercase font-bold">
            Profile
          </Link>

          <button
            type="button"
            className="text-white text-sm uppercase font-bold"
            onClick={logout}
          ></button>
        </nav>
      </div>
    </header>
  )
}

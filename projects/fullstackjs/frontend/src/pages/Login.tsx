import { Link } from 'react-router-dom'
import { Title, Button } from '../components/ui/'
import { Alert } from '../components/Alert'
import { useAuth } from '../hooks/useAuth'

export const Login = () => {
  const { auth, alert, login, setAuth } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    login()
  }

  const { message } = alert

  return (
    <>
      <Title>
        Sign in and Manage your <span className="text-black">Patients</span>
      </Title>

      <div className="mt-14 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {message && <Alert alert={alert} />}

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="my-6">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email:
            </label>
            <input
              type="text"
              placeholder="register email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
              value={auth.email}
              onChange={handleChange}
            />
          </div>
          <div className="my-6">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password:
            </label>
            <input
              type="text"
              placeholder="register email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
              value={auth.password}
              onChange={handleChange}
            />
          </div>
          <Button value="Sign in" />
        </form>

        <nav className="mt-5 flex gap-3">
          <Link to="/register" className="block text-center my-5 text-gray-500">
            Do not have an account? Sign up
          </Link>
          <Link
            to="/forgot-password"
            className="block text-center my-5 text-gray-500"
          >
            Forget my password
          </Link>
        </nav>
      </div>
    </>
  )
}

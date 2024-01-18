import { Link } from 'react-router-dom'
import { Title } from '../components/ui/Title'
import { Button } from '../components/ui/Button'

export const Login = () => {
  return (
    <>
      <div>
        <Title>
          Sign in and Manage your <span className="text-black">Patients</span>
        </Title>
      </div>

      <div className="mt-14 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form className="w-full">
          <div className="my-6">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email:
            </label>
            <input
              type="text"
              placeholder="register email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
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

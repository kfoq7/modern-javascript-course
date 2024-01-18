import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Input, Title } from '../components/ui'
import { Alert } from '../components/Alert'

export const Register = () => {
  const [veterinarian, setVeterinarian] = useState<Veterinarian>({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  })
  const [alert, setAlert] = useState<Alert>({ message: '', error: false })

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setVeterinarian(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (Object.values(veterinarian).includes('')) {
      setAlert({ message: 'Cannot empty fields', error: true })
      return
    }

    const { password, repeatPassword, ...restValues } = veterinarian

    if (password !== repeatPassword) {
      setAlert({ message: 'The password do not match', error: true })
      return
    }

    if (password.length < 6) {
      setAlert({
        message:
          'The password is too short, please add a minimun of 6 charactares.',
        error: true
      })
      return
    }

    try {
      const url = 'http://localhost:8000/api/veterinarian/register'
      const response = await axios.post(url, {
        ...restValues,
        password
      })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const { message } = alert

  return (
    <>
      <div>
        <Title>
          Create your account and manage{' '}
          <span className="text-black">your Patients</span>
        </Title>
      </div>

      <div className="mt-14 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {message && <Alert alert={alert} />}

        <form className="w-full">
          <div className="my-6">
            <Input
              label="Name:"
              name="name"
              placeholder="Your name"
              value={veterinarian.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="my-6">
            <Input
              label="Email:"
              name="email"
              placeholder="Register your email"
              value={veterinarian.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="my-6">
            <Input
              label="Password:"
              name="password"
              placeholder="Your password"
              value={veterinarian.password}
              onChange={handleOnChange}
            />
          </div>
          <div className="my-6">
            <Input
              label="Repeat password:"
              type="password"
              name="repeatPassword"
              placeholder="Repeat your password"
              value={veterinarian.repeatPassword}
              onChange={handleOnChange}
            />
          </div>
          <Button value="Register" onClick={handleOnSubmit} />
        </form>

        <nav className="mt-5 flex gap-3">
          <Link to="/" className="block text-center my-5 text-gray-500">
            Have an account? Sign in
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

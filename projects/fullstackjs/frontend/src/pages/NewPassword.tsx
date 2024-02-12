import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AxiosError } from 'axios'
import { Title, Input, Button } from '../components/ui'
import { Alert } from '../components/Alert'
import { clientAxios } from '../services/axios'

export const NewPassword = () => {
  const { token } = useParams()

  const [password, setPassword] = useState('')
  const [tokenValid, setTokenValid] = useState(false)
  const [alert, setAlert] = useState<Alert>({ message: '', error: false })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password.length < 6) {
      return setAlert({
        message: 'Password must be min 6 charactares',
        error: true
      })
    }

    try {
      const { data } = await clientAxios.post(
        `/veterinarian/forgot-password/${token}`,
        { password }
      )

      setAlert({ message: data.msg, error: false })
    } catch (error) {
      if (error instanceof AxiosError) {
        return setAlert({ message: error.response?.data.msg, error: true })
      }
    }
  }

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await clientAxios.get(`/veterinarian/forgot-password/${token}`)

        setAlert({ message: 'Set your new password', error: false })
        setTokenValid(true)
      } catch (error) {
        setAlert({ message: 'There was an error on the link', error: true })
      }
    }

    verifyToken()
  }, [token])

  const { message } = alert

  return (
    <>
      <Title>
        Reset your password and dont get lose access to{' '}
        <span className="text-black">your Patients</span>s
      </Title>

      <div>
        {message && <Alert alert={alert} />}

        {tokenValid && (
          <>
            <form onSubmit={handleSubmit}>
              <Input
                label="NewPassword"
                type="password"
                placeholder="Your new password"
                onChange={e => setPassword(e.target.value)}
              />

              <Button value="Save new password" />
            </form>

            <Link to="/" className="block text-center mt-5 text-gray-500">
              Log in
            </Link>
          </>
        )}
      </div>
    </>
  )
}

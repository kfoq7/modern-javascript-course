import { useState } from 'react'
import { AxiosError } from 'axios'
import { Alert } from '../components/Alert'
import { Button, Input, Title } from '../components/ui'
import { forgotPassword } from '../services/veterinarian.service'

export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState<Alert>({ message: '', error: false })

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (email === '') {
      return setAlert({ message: 'Email is required', error: true })
    }

    try {
      const { data } = await forgotPassword(email)

      setAlert({ message: data.msg, error: false })
    } catch (error) {
      if (error instanceof AxiosError) {
        setAlert({ message: error.response?.data.msg, error: true })
      }
    }
  }

  const { message } = alert

  return (
    <>
      <Title>
        Recover your access and not lose{' '}
        <span className="text-black">your Patients</span>
      </Title>

      <div className="mt-14 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {message && <Alert alert={alert} />}

        <form className="w-full" onSubmit={handleSumbit}>
          <div className="my-6">
            <Input
              label="Email:"
              name="name"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <Button value="Send instruccions" />
        </form>
      </div>
    </>
  )
}

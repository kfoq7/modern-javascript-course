import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Title } from '../components/ui'
import { Alert } from '../components/Alert'
import { verifyAccount } from '../services/veterinarian.service'
import { AxiosError } from 'axios'

export const ConfirmAccount = () => {
  const [accountConfirmed, setAccountConfirmed] = useState(false)
  const [alter, setAlert] = useState<Alert>({ message: '', error: false })
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    verifyAccount(id!)
      .then(response => {
        const { data } = response

        setAlert({ message: data?.msg, error: false })
        setAccountConfirmed(true)
      })
      .catch(err => {
        if (err instanceof AxiosError) {
          setAlert({
            message: err.response?.data.error,
            error: true
          })
        }
      })

    setLoading(false)
  }, [id])

  return (
    <>
      <Title>
        Confirm your account and start to manage{' '}
        <span className="text-black">your Patients</span>
      </Title>

      <div className="mt-14 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!loading && <Alert alert={alter} />}

        {accountConfirmed && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Sign in
          </Link>
        )}
      </div>
    </>
  )
}

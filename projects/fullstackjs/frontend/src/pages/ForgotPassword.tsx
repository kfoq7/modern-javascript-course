import { Button } from '../components/ui/Button'
import { Title } from '../components/ui/Title'

export const ForgotPassword = () => {
  return (
    <>
      <div>
        <Title>
          Recover your access and not lose{' '}
          <span className="text-black">your Patients</span>
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
              placeholder="Your email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
            />
          </div>

          <Button value="Send instruccions" />
        </form>
      </div>
    </>
  )
}

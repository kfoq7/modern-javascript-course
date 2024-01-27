import { Button, Input, Title } from '../components/ui'

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
            <Input
              label="Email:"
              name="name"
              placeholder="Your email"
              // value={veterinarian.name}
              // onChange={handleOnChange}
            />
          </div>

          <Button value="Send instruccions" />
        </form>
      </div>
    </>
  )
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Button = (props: Props) => (
  <input
    {...props}
    type="submit"
    className="bg-indigo-700 w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
  />
)

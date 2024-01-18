interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input = ({ label, type, ...restProps }: Props) => (
  <>
    <label className="uppercase text-gray-600 block text-xl font-bold">
      {label}
    </label>
    <input
      type={type ?? 'text'}
      className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
      {...restProps}
    />
  </>
)

interface Props {
  alert: Alert
}

export const Alert = ({ alert }: Props) => {
  const { message, error } = alert

  const isErrorColor = error
    ? 'from-red-400 to-red-600'
    : 'from-indigo-400 to-indigo-600'

  return (
    <div
      className={`${isErrorColor} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}
    >
      {message}
    </div>
  )
}

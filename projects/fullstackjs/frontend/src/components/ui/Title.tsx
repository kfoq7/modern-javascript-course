interface Props {
  children: React.ReactNode
}

export const Title = ({ children }: Props) => (
  <h1 className="text-indigo-600 font-black text-6xl">{children}</h1>
)

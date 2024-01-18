import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <main className="container h-dvh mx-auto md:grid md:grid-cols-2 gap-12 p-6 items-center">
      <Outlet />
    </main>
  )
}

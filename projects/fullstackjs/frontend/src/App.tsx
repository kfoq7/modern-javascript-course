import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthLayout } from './components/layouts/Auth'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ForgotPassword } from './pages/ForgotPassword'
import { ConfirmAccount } from './pages/ConfirmAccount'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="confirm/:id" element={<ConfirmAccount />} />
        </Route>

        {/* <Route path="/admin" element={<AdminLayout />}>

        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

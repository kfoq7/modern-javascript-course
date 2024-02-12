import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthLayout } from './components/layouts/Auth'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ForgotPassword } from './pages/ForgotPassword'
import { ConfirmAccount } from './pages/ConfirmAccount'
import { NewPassword } from './pages/NewPassword'
import { AuthProvider } from './context/authContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-password/:token" element={<NewPassword />} />
            <Route path="confirm/:id" element={<ConfirmAccount />} />
          </Route>

          {/* <Route path="/admin" element={<AdminLayout />}>

        </Route> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

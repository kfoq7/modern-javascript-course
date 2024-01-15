import { Router } from 'express'
import {
  register,
  profile,
  verify,
  authentication,
  forgotPassword,
  verifyToken,
  newPassword
} from '../controller/veterianrian.controller'
import { checkAuth } from '../middlewares/auth.middleware'

const router = Router()

/**
 * @Public endpoints
 */
router.post('/register', register)

router.get('/verify/:token', verify)

router.post('/login', authentication)

router.post('/forgot-password', forgotPassword)

router.route('/forgot-password/:token').get(verifyToken).post(newPassword)

/**
 * @Private endpoints
 */
router.get('/profile', checkAuth, profile)

export { router }

import { Router } from 'express'
import { register, profile, verify, authentication } from '../controller/veterianrian.controller'

const router = Router()

router.post('/register', register)

router.get('/profile', profile)

router.get('/verify/:token', verify)

router.post('/login', authentication)

export { router }

import { Router } from 'express'
import {
  addPatient,
  deletePatient,
  getPatient,
  getPatients,
  updatePatient
} from '../controller/patient.controller'
import { checkAuth } from '../middlewares/auth.middleware'

const router = Router()

router.route('/').post(checkAuth, addPatient).get(checkAuth, getPatients)

router
  .route('/:id')
  .get(checkAuth, getPatient)
  .put(checkAuth, updatePatient)
  .delete(checkAuth, deletePatient)

export { router }

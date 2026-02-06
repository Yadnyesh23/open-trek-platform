import { Router } from 'express'
import {getAllTreks ,getTrekByID ,createTrek } from '../controllers/treks.controller.js'

const router = Router()


router.get('/treks', getAllTreks)
router.get('/treks/:id', getTrekByID)
router.post('/treks', createTrek)

export default router
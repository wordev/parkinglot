import { Router } from 'express'

import parkingRoutes from './parkinglot'
import customerRoutes from './customer'


const router = Router()

router.use('/parking', parkingRoutes)
router.use('/customer', customerRoutes)


export default router
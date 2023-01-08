import { Router } from 'express'
import controller from '../controller/customer'


const router = Router()

router.route('/park').post(controller.customerParkCar)
router.route('/leave').post(controller.customerLeaveCar)


export default router
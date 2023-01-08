import { Router } from 'express'
import controller from '../controller/parkinglot'


const router = Router()

router.route('/create').post(controller.createParkinglot)
router.route('/getstatus/:parkinglotId').get(controller.getStatusParkinglot)
router.route('/getlist-numberplate').post(controller.getListNumberplate)
router.route('/getlist-slotnumber').post(controller.getListSlotNumber)


export default router
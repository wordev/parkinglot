import * as DB from '../repository'
import { ReqCustomerParkCar, RespCustomerParkCar, ReqCustomerLeaveParkCar } from '../model/request-create-parking'
import VEHICLE_TYPE from '../constant/vehicle-type-constant'

async function customerParkCar(req: ReqCustomerParkCar): Promise<RespCustomerParkCar> {
    try {

        //Find Slot
        let slotAvailable = await DB.ParkinglotSlot.findOne({
            where: {
                parkinglotId: req.parkinglotId,
                isAvailable: true,
                vehicleType: req.vehicleType
            },
            order: [['priority', 'ASC']]
        })

        let parkinglotSlotId = slotAvailable?.dataValues?.parkinglotSlotId
        if (!parkinglotSlotId) {
            throw new Error('parkinglotSlotId is null or slot is full')
        }

        //Update Slot
        let slotUpdate = await DB.ParkinglotSlot.update(
            { isAvailable: false },
            {
                where: { parkinglotSlotId },
                returning: true,
            })
        let isUpdateSucess = slotUpdate[0] == 1 ? true : false
        if (!isUpdateSucess) {
            throw new Error('reserve slot fail')
        }

        //Create Ticket
        let createTicket = await DB.Ticket.create({
            parkinglotSlotId
        })

        if (!createTicket.ticketId) {
            throw new Error('create ticker fail')
        }

        //Create Vehicle
        let createVehicle = await DB.Vehicle.create({
            numberPlate: req.numberPlate,
            vehicleType: req.vehicleType,
            ticketId: createTicket.ticketId
        })

        if (!createVehicle.vehicleId) {
            throw new Error('create vehicle fail')
        }

        let resp: RespCustomerParkCar = {
            numberPlate: req.numberPlate,
            ticketId: createTicket.ticketId,
            enterAt: createTicket.enterAt,
            slotCar: slotUpdate[1][0].get().priority
        }

        return resp


    } catch (err) {
        console.log("Occur Error customerParkCar : ", err)
        throw new Error("Occur Error customerParkCar")

    }
}



async function customerLeaveParkingCar(req: ReqCustomerLeaveParkCar): Promise<boolean> {
    try {


        //Find Slot
        let slotAvailable = await DB.Ticket.findOne({
            where: {
                ticketId: req.ticketId
            }
        })

        let parkinglotSlotId = slotAvailable?.dataValues?.parkinglotSlotId
        if (!parkinglotSlotId) {
            throw new Error('parkinglotSlotId is null or slot not found')
        }

        //Update Slot
        let slotUpdate = await DB.ParkinglotSlot.update(
            { isAvailable: true },
            {
                where: { parkinglotSlotId },
                returning: true,
            })
        let isUpdateSucess = slotUpdate[0] == 1 ? true : false
        if (!isUpdateSucess) {
            throw new Error('reserve slot fail')
        }


        const exitAt = new Date().toISOString();

        //Update Ticket
        let ticketUpdate = await DB.Ticket.update(
            { exitAt },
            {
                where: {
                    ticketId: req.ticketId
                },
                returning: true,
            })

        let isUpdateTicketSucess = ticketUpdate[0] == 1 ? true : false
        if (!isUpdateTicketSucess) {
            throw new Error('update ticker fail')
        }

        //Update Vehicle
        let updateVehicle = await DB.Vehicle.update(
            { exitAt },
            {
                where: {
                    ticketId: req.ticketId
                },
                returning: true,
            })

        let isUpdateVehicleSucess = updateVehicle[0] == 1 ? true : false

        if (!isUpdateVehicleSucess) {
            throw new Error('update vehicle fail')
        }

        return true


    } catch (err) {
        console.log("Occur Error customerLeaveParkingCar : ", err)
        throw new Error("Occur Error customerLeaveParkingCar")

    }
}




export default {
    customerParkCar,
    customerLeaveParkingCar
}
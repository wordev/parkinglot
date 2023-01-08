import * as DB from '../repository'
import { ReqCreateParking, ReqCreateParkingSlot } from '../model/request-create-parking'
import VEHICLE_TYPE from '../constant/vehicle-type-constant'


async function createParkingService(req: ReqCreateParking): Promise<string> {
    try {
        let parkinglot = await DB.Parkinglot.create({
            name: req.name,
            smallSizeAmount: req.smallSizeAmount,
            mediumSizeAmount: req.mediumSizeAmount,
            largeSizeAmount: req.largeSizeAmount
        })
        return parkinglot.parkinglotId

    } catch (err) {
        console.log("CreateParkingService : ", err)
    }
    return ""
}


function createParkingSlot(size: number, fk: string, vehicleType: number, priority = 1) {
    if (size <= 0 || vehicleType <= 0) {
        throw Error("argument should be more than 0")
    }
    return Array.from(Array(size)).map((_, i) => {
        let smallSlot = {
            isAvailable: true,
            priority: priority + i,
            parkinglotId: fk,
            vehicleType
        }
        return smallSlot
    })
}

async function createParkingSlotService(req: ReqCreateParkingSlot): Promise<boolean> {
    try {
        let fk = req.parkinglotId
        let mediumPriority = req.smallSizeAmount + 1
        let largePriority = req.smallSizeAmount + req.mediumSizeAmount + 1

        let bulkSlot = [
            ...createParkingSlot(req.smallSizeAmount, fk, VEHICLE_TYPE.SMALL),
            ...createParkingSlot(req.mediumSizeAmount, fk, VEHICLE_TYPE.MEDIUM, mediumPriority),
            ...createParkingSlot(req.largeSizeAmount, fk, VEHICLE_TYPE.LARGE, largePriority)
        ]
        console.log("bulkSlot", bulkSlot)

        let parkinglot = await DB.ParkinglotSlot.bulkCreate(bulkSlot)
        return parkinglot.length > 0 ? true : false

    } catch (err) {
        console.log("CreateParkingSlotService : ", err)
    }
    return false
}



function mapAvailableSlot(data: any[]) {


    let smallSizeAmount = 0, mediumSizeAmount = 0, largeSizeAmount = 0


    data.map(m => m.dataValues).reduce((p, c) => {

        if (c.vehicleType == VEHICLE_TYPE.SMALL) {
            smallSizeAmount++
        } else if (c.vehicleType == VEHICLE_TYPE.MEDIUM) {
            mediumSizeAmount++
        } else if (c.vehicleType == VEHICLE_TYPE.LARGE) {
            largeSizeAmount++
        }

        return p
    }, [])

    return { smallSizeAmount, mediumSizeAmount, largeSizeAmount }

}

async function getStatusParkingLot(parkinglotId: string): Promise<any> {
    try {

        let availableSlot = await DB.ParkinglotSlot.findAll({
            where: {
                parkinglotId,
                isAvailable: true
            }
        })

        let mapAvailable = mapAvailableSlot(availableSlot)
        let isAvailable = availableSlot.length > 0 ? true : false
        return {
            ...mapAvailable,
            isAvailable
        }

    } catch (err) {
        console.log("GetStatusParkingLot : ", err)
    }
    return false
}


async function getListNumberPlateByCarSize(vehicleType: number): Promise<any> {
    try {

        let vehicleList = await DB.Vehicle.findAll({
            where: {
                vehicleType,
                exitAt: null
            }
        })

        let listNumberPlate = vehicleList.map(m => {

            return {
                numberPlate: m.dataValues.numberPlate
            }
        })

        return listNumberPlate


    } catch (err) {
        console.log("getStatusNumberPlateByCarSize : ", err)
        throw new Error("getStatusNumberPlateByCarSize  ",)

    }
}


async function getListSlotNumberByCarSize(vehicleType: number): Promise<any> {
    try {

        let vehicleSlotNumberList = await DB.ParkinglotSlot.findAll({
            where: {
                vehicleType,
                isAvailable: false
            }
        })

        let listSlotNumberPlate = vehicleSlotNumberList.map(m => {

            return {
                slotNumber: m.dataValues.priority
            }
        })


        return listSlotNumberPlate


    } catch (err) {
        console.log("getListSlotNumberByCarSize : ", err)
        throw new Error("getListSlotNumberByCarSize  ",)

    }
}

export default {
    createParkingService,
    createParkingSlotService,
    getStatusParkingLot,
    getListNumberPlateByCarSize,
    getListSlotNumberByCarSize,
    createParkingSlot,
    mapAvailableSlot
}
import express, { Request, Response, json } from 'express';
import service from '../service/customer-service';
import HTTP from '../constant/http-constant'

/* POST 
 *   > Returns a list of all classes */
async function customerParkCar(req: Request, res: Response) {
    const { numberPlate, vehicleType, parkinglotId } = req.body;
    if (!numberPlate || vehicleType <= 0 || !parkinglotId)
        return res.status(HTTP.HTTP_STATUS.INVALID_REQUEST).json({
            message: HTTP.HTTP_MSG.INVALID_REQUEST
        });
    try {

        const isCreateParkinglotSlot = await service.customerParkCar(req.body)

        return res.json({
            message: HTTP.HTTP_MSG.SUCCESS,
            data: isCreateParkinglotSlot
        })


    } catch (e) {
        return res.status(HTTP.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: HTTP.HTTP_MSG.INTERNAL_SERVER_ERROR,
            error: e
        });
    }
}



/* GET 
 *   > Returns a list of all classes */
async function customerLeaveCar(req: Request, res: Response) {
    const { ticketId } = req.body;
    if (!ticketId)
        return res.status(HTTP.HTTP_STATUS.INVALID_REQUEST).json({
            message: HTTP.HTTP_MSG.INVALID_REQUEST
        });
    try {
        const response = await service.customerLeaveParkingCar({ticketId});
        return res.json({
            message: HTTP.HTTP_MSG.SUCCESS,
            data: response
        })
    } catch (e) {
        return res.status(HTTP.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: HTTP.HTTP_MSG.INTERNAL_SERVER_ERROR,
            error: e
        });
    }
}


export default {
    customerParkCar,
    customerLeaveCar
}
import express, { Request, Response, json } from 'express';
import service from '../service/parking-service';
import HTTP from '../constant/http-constant'

/* POST 
 *   > Returns a list of all classes */
async function createParkinglot(req: Request, res: Response) {
    const { name, smallSizeAmount, mediumSizeAmount, largeSizeAmount } = req.body;
    if (!name || smallSizeAmount <= 0 || mediumSizeAmount <= 0 || largeSizeAmount <= 0)
        return res.status(HTTP.HTTP_STATUS.INVALID_REQUEST).json({
            message: HTTP.HTTP_MSG.INVALID_REQUEST
        });
    try {

        const parkinglotId = await service.createParkingService(req.body);

        if (parkinglotId) {
            const isCreateParkinglotSlot = await service.createParkingSlotService({
                parkinglotId,
                smallSizeAmount,
                mediumSizeAmount,
                largeSizeAmount
            })

            console.log("isCreateParkinglotSlot: ", isCreateParkinglotSlot)

            return res.json({
                message: HTTP.HTTP_MSG.SUCCESS,
                data: {
                    parkinglotId
                }
            })
        }

    } catch (e) {
        return res.status(HTTP.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: HTTP.HTTP_MSG.INTERNAL_SERVER_ERROR,
            error: e
        });
    }
}



/* GET 
 *   > Returns a list of all classes */
async function getStatusParkinglot(req: Request, res: Response) {
    const paramParkinglotId = req.params['parkinglotId']
    if (!paramParkinglotId)
        return res.status(HTTP.HTTP_STATUS.INVALID_REQUEST).json({
            message: HTTP.HTTP_MSG.INVALID_REQUEST
        });
    try {
        const response = await service.getStatusParkingLot(paramParkinglotId);
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



/* POST 
 *   > Returns a list of all classes */
async function getListNumberplate(req: Request, res: Response) {
    const { vehicleType } = req.body;
    if (!vehicleType)
        return res.status(HTTP.HTTP_STATUS.INVALID_REQUEST).json({
            message: HTTP.HTTP_MSG.INVALID_REQUEST
        });
    try {

        const listResp = await service.getListNumberPlateByCarSize(vehicleType);

        return res.json({
            message: HTTP.HTTP_MSG.SUCCESS,
            data: listResp
        })

    } catch (e) {
        return res.status(HTTP.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: HTTP.HTTP_MSG.INTERNAL_SERVER_ERROR,
            error: e
        });
    }
}

/* POST 
 *   > Returns a list of all classes */
async function getListSlotNumber(req: Request, res: Response) {
    const { vehicleType } = req.body;
    if (!vehicleType)
        return res.status(HTTP.HTTP_STATUS.INVALID_REQUEST).json({
            message: HTTP.HTTP_MSG.INVALID_REQUEST
        });
    try {

        const listResp = await service.getListSlotNumberByCarSize(vehicleType);

        return res.json({
            message: HTTP.HTTP_MSG.SUCCESS,
            data: listResp
        })

    } catch (e) {
        return res.status(HTTP.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: HTTP.HTTP_MSG.INTERNAL_SERVER_ERROR,
            error: e
        });
    }
}


export default {
    createParkinglot,
    getStatusParkinglot,
    getListNumberplate,
    getListSlotNumber
}
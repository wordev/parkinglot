"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_service_1 = __importDefault(require("../service/customer-service"));
const http_constant_1 = __importDefault(require("../constant/http-constant"));
/* POST
 *   > Returns a list of all classes */
function customerParkCar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { numberPlate, vehicleType, parkinglotId } = req.body;
        if (!numberPlate || vehicleType <= 0 || !parkinglotId)
            return res.status(http_constant_1.default.HTTP_STATUS.INVALID_REQUEST).json({
                message: http_constant_1.default.HTTP_MSG.INVALID_REQUEST
            });
        try {
            const isCreateParkinglotSlot = yield customer_service_1.default.customerParkCar(req.body);
            return res.json({
                message: http_constant_1.default.HTTP_MSG.SUCCESS,
                data: isCreateParkinglotSlot
            });
        }
        catch (e) {
            return res.status(http_constant_1.default.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                message: http_constant_1.default.HTTP_MSG.INTERNAL_SERVER_ERROR,
                error: e
            });
        }
    });
}
/* GET
 *   > Returns a list of all classes */
function customerLeaveCar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ticketId } = req.body;
        if (!ticketId)
            return res.status(http_constant_1.default.HTTP_STATUS.INVALID_REQUEST).json({
                message: http_constant_1.default.HTTP_MSG.INVALID_REQUEST
            });
        try {
            const response = yield customer_service_1.default.customerLeaveParkingCar({ ticketId });
            return res.json({
                message: http_constant_1.default.HTTP_MSG.SUCCESS,
                data: response
            });
        }
        catch (e) {
            return res.status(http_constant_1.default.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                message: http_constant_1.default.HTTP_MSG.INTERNAL_SERVER_ERROR,
                error: e
            });
        }
    });
}
exports.default = {
    customerParkCar,
    customerLeaveCar
};

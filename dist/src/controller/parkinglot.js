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
const parking_service_1 = __importDefault(require("../service/parking-service"));
const http_constant_1 = __importDefault(require("../constant/http-constant"));
/* POST
 *   > Returns a list of all classes */
function createParkinglot(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, smallSizeAmount, mediumSizeAmount, largeSizeAmount } = req.body;
        if (!name || smallSizeAmount <= 0 || mediumSizeAmount <= 0 || largeSizeAmount <= 0)
            return res.status(http_constant_1.default.HTTP_STATUS.INVALID_REQUEST).json({
                message: http_constant_1.default.HTTP_MSG.INVALID_REQUEST
            });
        try {
            const parkinglotId = yield parking_service_1.default.createParkingService(req.body);
            if (parkinglotId) {
                const isCreateParkinglotSlot = yield parking_service_1.default.createParkingSlotService({
                    parkinglotId,
                    smallSizeAmount,
                    mediumSizeAmount,
                    largeSizeAmount
                });
                console.log("isCreateParkinglotSlot: ", isCreateParkinglotSlot);
                return res.json({
                    message: http_constant_1.default.HTTP_MSG.SUCCESS,
                    data: {
                        parkinglotId
                    }
                });
            }
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
function getStatusParkinglot(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const paramParkinglotId = req.params['parkinglotId'];
        if (!paramParkinglotId)
            return res.status(http_constant_1.default.HTTP_STATUS.INVALID_REQUEST).json({
                message: http_constant_1.default.HTTP_MSG.INVALID_REQUEST
            });
        try {
            const response = yield parking_service_1.default.getStatusParkingLot(paramParkinglotId);
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
/* POST
 *   > Returns a list of all classes */
function getListNumberplate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { vehicleType } = req.body;
        if (!vehicleType)
            return res.status(http_constant_1.default.HTTP_STATUS.INVALID_REQUEST).json({
                message: http_constant_1.default.HTTP_MSG.INVALID_REQUEST
            });
        try {
            const listResp = yield parking_service_1.default.getListNumberPlateByCarSize(vehicleType);
            return res.json({
                message: http_constant_1.default.HTTP_MSG.SUCCESS,
                data: listResp
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
/* POST
 *   > Returns a list of all classes */
function getListSlotNumber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { vehicleType } = req.body;
        if (!vehicleType)
            return res.status(http_constant_1.default.HTTP_STATUS.INVALID_REQUEST).json({
                message: http_constant_1.default.HTTP_MSG.INVALID_REQUEST
            });
        try {
            const listResp = yield parking_service_1.default.getListSlotNumberByCarSize(vehicleType);
            return res.json({
                message: http_constant_1.default.HTTP_MSG.SUCCESS,
                data: listResp
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
    createParkinglot,
    getStatusParkinglot,
    getListNumberplate,
    getListSlotNumber
};

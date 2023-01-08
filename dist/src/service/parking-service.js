"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const DB = __importStar(require("../repository"));
const vehicle_type_constant_1 = __importDefault(require("../constant/vehicle-type-constant"));
function createParkingService(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let parkinglot = yield DB.Parkinglot.create({
                name: req.name,
                smallSizeAmount: req.smallSizeAmount,
                mediumSizeAmount: req.mediumSizeAmount,
                largeSizeAmount: req.largeSizeAmount
            });
            return parkinglot.parkinglotId;
        }
        catch (err) {
            console.log("CreateParkingService : ", err);
        }
        return "";
    });
}
function createParkingSlot(size, fk, vehicleType, priority = 1) {
    if (size <= 0 || vehicleType <= 0) {
        throw Error("argument should be more than 0");
    }
    return Array.from(Array(size)).map((_, i) => {
        let smallSlot = {
            isAvailable: true,
            priority: priority + i,
            parkinglotId: fk,
            vehicleType
        };
        return smallSlot;
    });
}
function createParkingSlotService(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let fk = req.parkinglotId;
            let mediumPriority = req.smallSizeAmount + 1;
            let largePriority = req.smallSizeAmount + req.mediumSizeAmount + 1;
            let bulkSlot = [
                ...createParkingSlot(req.smallSizeAmount, fk, vehicle_type_constant_1.default.SMALL),
                ...createParkingSlot(req.mediumSizeAmount, fk, vehicle_type_constant_1.default.MEDIUM, mediumPriority),
                ...createParkingSlot(req.largeSizeAmount, fk, vehicle_type_constant_1.default.LARGE, largePriority)
            ];
            console.log("bulkSlot", bulkSlot);
            let parkinglot = yield DB.ParkinglotSlot.bulkCreate(bulkSlot);
            return parkinglot.length > 0 ? true : false;
        }
        catch (err) {
            console.log("CreateParkingSlotService : ", err);
        }
        return false;
    });
}
function mapAvailableSlot(data) {
    let smallSizeAmount = 0, mediumSizeAmount = 0, largeSizeAmount = 0;
    data.map(m => m.dataValues).reduce((p, c) => {
        if (c.vehicleType == vehicle_type_constant_1.default.SMALL) {
            smallSizeAmount++;
        }
        else if (c.vehicleType == vehicle_type_constant_1.default.MEDIUM) {
            mediumSizeAmount++;
        }
        else if (c.vehicleType == vehicle_type_constant_1.default.LARGE) {
            largeSizeAmount++;
        }
        return p;
    }, []);
    return { smallSizeAmount, mediumSizeAmount, largeSizeAmount };
}
function getStatusParkingLot(parkinglotId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let availableSlot = yield DB.ParkinglotSlot.findAll({
                where: {
                    parkinglotId,
                    isAvailable: true
                }
            });
            let mapAvailable = mapAvailableSlot(availableSlot);
            let isAvailable = availableSlot.length > 0 ? true : false;
            return Object.assign(Object.assign({}, mapAvailable), { isAvailable });
        }
        catch (err) {
            console.log("GetStatusParkingLot : ", err);
        }
        return false;
    });
}
function getListNumberPlateByCarSize(vehicleType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let vehicleList = yield DB.Vehicle.findAll({
                where: {
                    vehicleType,
                    exitAt: null
                }
            });
            let listNumberPlate = vehicleList.map(m => {
                return {
                    numberPlate: m.dataValues.numberPlate
                };
            });
            return listNumberPlate;
        }
        catch (err) {
            console.log("getStatusNumberPlateByCarSize : ", err);
            throw new Error("getStatusNumberPlateByCarSize  ");
        }
    });
}
function getListSlotNumberByCarSize(vehicleType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let vehicleSlotNumberList = yield DB.ParkinglotSlot.findAll({
                where: {
                    vehicleType,
                    isAvailable: false
                }
            });
            let listSlotNumberPlate = vehicleSlotNumberList.map(m => {
                return {
                    slotNumber: m.dataValues.priority
                };
            });
            return listSlotNumberPlate;
        }
        catch (err) {
            console.log("getListSlotNumberByCarSize : ", err);
            throw new Error("getListSlotNumberByCarSize  ");
        }
    });
}
exports.default = {
    createParkingService,
    createParkingSlotService,
    getStatusParkingLot,
    getListNumberPlateByCarSize,
    getListSlotNumberByCarSize,
    createParkingSlot,
    mapAvailableSlot
};

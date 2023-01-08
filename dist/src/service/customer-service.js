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
Object.defineProperty(exports, "__esModule", { value: true });
const DB = __importStar(require("../repository"));
function customerParkCar(req) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Find Slot
            let slotAvailable = yield DB.ParkinglotSlot.findOne({
                where: {
                    parkinglotId: req.parkinglotId,
                    isAvailable: true,
                    vehicleType: req.vehicleType
                },
                order: [['priority', 'ASC']]
            });
            let parkinglotSlotId = (_a = slotAvailable === null || slotAvailable === void 0 ? void 0 : slotAvailable.dataValues) === null || _a === void 0 ? void 0 : _a.parkinglotSlotId;
            if (!parkinglotSlotId) {
                throw new Error('parkinglotSlotId is null or slot is full');
            }
            //Update Slot
            let slotUpdate = yield DB.ParkinglotSlot.update({ isAvailable: false }, {
                where: { parkinglotSlotId },
                returning: true,
            });
            let isUpdateSucess = slotUpdate[0] == 1 ? true : false;
            if (!isUpdateSucess) {
                throw new Error('reserve slot fail');
            }
            //Create Ticket
            let createTicket = yield DB.Ticket.create({
                parkinglotSlotId
            });
            if (!createTicket.ticketId) {
                throw new Error('create ticker fail');
            }
            //Create Vehicle
            let createVehicle = yield DB.Vehicle.create({
                numberPlate: req.numberPlate,
                vehicleType: req.vehicleType,
                ticketId: createTicket.ticketId
            });
            if (!createVehicle.vehicleId) {
                throw new Error('create vehicle fail');
            }
            let resp = {
                numberPlate: req.numberPlate,
                ticketId: createTicket.ticketId,
                enterAt: createTicket.enterAt,
                slotCar: slotUpdate[1][0].get().priority
            };
            return resp;
        }
        catch (err) {
            console.log("Occur Error customerParkCar : ", err);
            throw new Error("Occur Error customerParkCar");
        }
    });
}
function customerLeaveParkingCar(req) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Find Slot
            let slotAvailable = yield DB.Ticket.findOne({
                where: {
                    ticketId: req.ticketId
                }
            });
            let parkinglotSlotId = (_a = slotAvailable === null || slotAvailable === void 0 ? void 0 : slotAvailable.dataValues) === null || _a === void 0 ? void 0 : _a.parkinglotSlotId;
            if (!parkinglotSlotId) {
                throw new Error('parkinglotSlotId is null or slot not found');
            }
            //Update Slot
            let slotUpdate = yield DB.ParkinglotSlot.update({ isAvailable: true }, {
                where: { parkinglotSlotId },
                returning: true,
            });
            let isUpdateSucess = slotUpdate[0] == 1 ? true : false;
            if (!isUpdateSucess) {
                throw new Error('reserve slot fail');
            }
            const exitAt = new Date().toISOString();
            //Update Ticket
            let ticketUpdate = yield DB.Ticket.update({ exitAt }, {
                where: {
                    ticketId: req.ticketId
                },
                returning: true,
            });
            let isUpdateTicketSucess = ticketUpdate[0] == 1 ? true : false;
            if (!isUpdateTicketSucess) {
                throw new Error('update ticker fail');
            }
            //Update Vehicle
            let updateVehicle = yield DB.Vehicle.update({ exitAt }, {
                where: {
                    ticketId: req.ticketId
                },
                returning: true,
            });
            let isUpdateVehicleSucess = updateVehicle[0] == 1 ? true : false;
            if (!isUpdateVehicleSucess) {
                throw new Error('update vehicle fail');
            }
            return true;
        }
        catch (err) {
            console.log("Occur Error customerLeaveParkingCar : ", err);
            throw new Error("Occur Error customerLeaveParkingCar");
        }
    });
}
exports.default = {
    customerParkCar,
    customerLeaveParkingCar
};

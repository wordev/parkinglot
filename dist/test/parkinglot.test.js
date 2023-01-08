"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import request from "supertest"
const parking_service_1 = __importDefault(require("../src/service/parking-service"));
// import { jest } from '@jest/globals'
describe('When create car slots', () => {
    it('case create one vehicle should be length = 1', () => {
        expect(parking_service_1.default.createParkingSlot(1, "test", 1)).toHaveLength(1);
    });
    it('case create one vehicle should be length = 10', () => {
        expect(parking_service_1.default.createParkingSlot(10, "test", 1)).toHaveLength(10);
    });
    let small = parking_service_1.default.createParkingSlot(10, "test", 1);
    let meduim = parking_service_1.default.createParkingSlot(10, "test", 2, small.length + 1);
    let large = parking_service_1.default.createParkingSlot(10, "test", 3, small.length + meduim.length + 1);
    let all = [...small, ...meduim, ...large];
    it('case create all slot should be length = 30', () => {
        expect(all).toHaveLength(30);
    });
    it('case check element create small slot', () => {
        expect(all[0]).toMatchObject({
            isAvailable: true,
            priority: 1,
            parkinglotId: "test",
            vehicleType: 1
        });
    });
    it('case check element create medium slot', () => {
        expect(all[10]).toMatchObject({
            isAvailable: true,
            priority: 11,
            parkinglotId: "test",
            vehicleType: 2
        });
    });
    it('case check element create large slot', () => {
        expect(all[29]).toMatchObject({
            isAvailable: true,
            priority: 30,
            parkinglotId: "test",
            vehicleType: 3
        });
    });
});
describe('When Get Status Parkinglot', () => {
    it('case has only one small slot', () => {
        let mockOne = [{
                dataValues: {
                    vehicleType: 1,
                    parkinglotSlotId: "",
                    parkinglotId: "",
                    isAvailable: true,
                    priority: 1
                }
            }];
        expect(parking_service_1.default.mapAvailableSlot(mockOne)).toMatchObject({
            smallSizeAmount: 1,
            mediumSizeAmount: 0,
            largeSizeAmount: 0
        });
    });
    it('case have small and medium slot', () => {
        let mockOne = [{
                dataValues: {
                    vehicleType: 1,
                    parkinglotSlotId: "",
                    parkinglotId: "",
                    isAvailable: true,
                    priority: 1
                }
            }, {
                dataValues: {
                    vehicleType: 2,
                    parkinglotSlotId: "",
                    parkinglotId: "",
                    isAvailable: true,
                    priority: 1
                }
            }, {
                dataValues: {
                    vehicleType: 2,
                    parkinglotSlotId: "",
                    parkinglotId: "",
                    isAvailable: true,
                    priority: 1
                }
            }];
        expect(parking_service_1.default.mapAvailableSlot(mockOne)).toMatchObject({
            smallSizeAmount: 1,
            mediumSizeAmount: 2,
            largeSizeAmount: 0
        });
    });
    it('case have small medium and large slot', () => {
        let mock = [{
                dataValues: {
                    vehicleType: 1,
                    parkinglotSlotId: "",
                    parkinglotId: "",
                    isAvailable: true,
                    priority: 1
                }
            }, {
                dataValues: {
                    vehicleType: 2,
                    parkinglotSlotId: "",
                    parkinglotId: "",
                    isAvailable: true,
                    priority: 1
                }
            }, {
                dataValues: {
                    vehicleType: 3,
                    parkinglotSlotId: "",
                    parkinglotId: "",
                    isAvailable: true,
                    priority: 1
                }
            }];
        expect(parking_service_1.default.mapAvailableSlot(mock)).toMatchObject({
            smallSizeAmount: 1,
            mediumSizeAmount: 1,
            largeSizeAmount: 1
        });
    });
});

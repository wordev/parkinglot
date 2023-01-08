"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parkinglot_1 = __importDefault(require("../controller/parkinglot"));
const router = (0, express_1.Router)();
router.route('/create').post(parkinglot_1.default.createParkinglot);
router.route('/getstatus/:parkinglotId').get(parkinglot_1.default.getStatusParkinglot);
router.route('/getlist-numberplate').post(parkinglot_1.default.getListNumberplate);
router.route('/getlist-slotnumber').post(parkinglot_1.default.getListSlotNumber);
exports.default = router;

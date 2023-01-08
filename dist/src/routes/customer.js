"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_1 = __importDefault(require("../controller/customer"));
const router = (0, express_1.Router)();
router.route('/park').post(customer_1.default.customerParkCar);
router.route('/leave').post(customer_1.default.customerLeaveCar);
exports.default = router;

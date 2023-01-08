"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parkinglot_1 = __importDefault(require("./parkinglot"));
const customer_1 = __importDefault(require("./customer"));
const router = (0, express_1.Router)();
router.use('/parking', parkinglot_1.default);
router.use('/customer', customer_1.default);
exports.default = router;

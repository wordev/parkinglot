"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleType = exports.Vehicle = exports.Ticket = exports.ParkinglotSlot = exports.Parkinglot = exports.Database = void 0;
const sequelize_1 = require("sequelize");
const parkinglot_1 = __importDefault(require("./parkinglot"));
exports.Parkinglot = parkinglot_1.default;
const parkinglot_slot_1 = __importDefault(require("./parkinglot-slot"));
exports.ParkinglotSlot = parkinglot_slot_1.default;
const ticket_1 = __importDefault(require("./ticket"));
exports.Ticket = ticket_1.default;
const vehicle_1 = __importDefault(require("./vehicle"));
exports.Vehicle = vehicle_1.default;
const vehicle_type_1 = __importDefault(require("./vehicle-type"));
exports.VehicleType = vehicle_type_1.default;
const config_json_1 = __importDefault(require("../config/config.json"));
// Open database connection
const sequelize = new sequelize_1.Sequelize(config_json_1.default.database.database, config_json_1.default.database.username, config_json_1.default.database.password, config_json_1.default.database);
exports.Database = sequelize;
// Initialize each model in the database
// This must be done before associations are made
let models = [parkinglot_1.default, parkinglot_slot_1.default, ticket_1.default, vehicle_1.default, vehicle_type_1.default];
models.forEach(model => model.initialize(sequelize));
// One to Many FK defind in ParkinglotSlot
parkinglot_1.default.hasMany(parkinglot_slot_1.default, {
    foreignKey: {
        name: 'parkinglot_id',
        allowNull: false
    }
});
// One to One FK defind in Ticket
ticket_1.default.belongsTo(parkinglot_slot_1.default, {
    foreignKey: {
        name: 'parkinglot_slot_id',
        allowNull: true
    }
});
// One to One FK defind in Vehicle
vehicle_1.default.belongsTo(ticket_1.default, {
    foreignKey: {
        name: 'ticket_id',
        allowNull: true
    }
});
sequelize.sync({ force: false });

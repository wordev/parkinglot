"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class VehicleType extends sequelize_1.Model {
    // public readonly ParkinglotSlots?: ParkinglotSlot[]
    // public static associations: {
    //   ParkinglotSlots: Association<ParkinglotSlot>
    // }
    static initialize(sequelize) {
        this.init({
            vehicleId: {
                field: 'vehicle_id',
                type: sequelize_1.DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            vehicleType: {
                field: 'vehicle_type',
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            createdAt: {
                field: 'created_at',
                type: 'TIMESTAMP',
                allowNull: true,
            },
        }, {
            timestamps: false,
            sequelize,
            tableName: 'vehicle_type',
            freezeTableName: true,
        });
    }
}
exports.default = VehicleType;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
class ParkinglotSlot extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            parkinglotSlotId: {
                field: 'parkinglot_slot_id',
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                allowNull: true,
            },
            parkinglotId: {
                field: 'parkinglot_id',
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
            isAvailable: {
                field: 'is_available',
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            priority: {
                field: 'priority',
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            vehicleType: {
                field: 'vehicle_type',
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                field: 'created_at',
                type: 'TIMESTAMP',
                allowNull: false,
            },
            updatedAt: {
                field: 'updated_at',
                type: 'TIMESTAMP',
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: 'parkinglot_slot',
            freezeTableName: true,
        }),
            // ParkinglotSlot.beforeCreate(async (parking) => {
            //     parking.parkinglotSlotId = uuidv4();
            // })
            // ,
            ParkinglotSlot.beforeBulkCreate((parkings, options) => {
                for (const parking of parkings) {
                    parking.parkinglotSlotId = (0, uuid_1.v4)();
                }
                // // Add `memberSince` to updateOnDuplicate otherwise it won't be persisted
                // if (options.updateOnDuplicate && !options.updateOnDuplicate.includes('memberSince')) {
                //     options.updateOnDuplicate.push('memberSince');
                // }
            });
    }
}
exports.default = ParkinglotSlot;

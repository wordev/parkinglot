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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
class Parkinglot extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            parkinglotId: {
                field: 'parkinglot_id',
                primaryKey: true,
                type: sequelize_1.DataTypes.UUID,
                allowNull: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            smallSizeAmount: {
                field: 'small_size_amount',
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            mediumSizeAmount: {
                field: 'medium_size_amount',
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            largeSizeAmount: {
                field: 'large_size_amount',
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
            tableName: 'parkinglot',
            freezeTableName: true,
        }),
            Parkinglot.beforeCreate((parking) => __awaiter(this, void 0, void 0, function* () {
                parking.parkinglotId = (0, uuid_1.v4)();
            }));
    }
}
exports.default = Parkinglot;

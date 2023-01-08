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
class Ticket extends sequelize_1.Model {
    // public readonly ParkinglotSlots?: ParkinglotSlot[]
    // public static associations: {
    //   ParkinglotSlots: Association<ParkinglotSlot>
    // }
    static initialize(sequelize) {
        this.init({
            ticketId: {
                field: 'ticket_id',
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                allowNull: true,
            },
            enterAt: {
                field: 'enter_at',
                type: 'TIMESTAMP',
                allowNull: false,
                defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
            },
            exitAt: {
                field: 'exit_at',
                type: 'TIMESTAMP',
                allowNull: true,
            },
            parkinglotSlotId: {
                field: 'parkinglot_slot_id',
                type: sequelize_1.DataTypes.UUID,
                allowNull: true,
            }
        }, {
            timestamps: false,
            sequelize,
            tableName: 'ticket',
            freezeTableName: true,
        }),
            Ticket.beforeCreate((ticket) => __awaiter(this, void 0, void 0, function* () {
                ticket.ticketId = (0, uuid_1.v4)();
            }));
    }
}
exports.default = Ticket;

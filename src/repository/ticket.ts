import {
    DataTypes, Model, Sequelize, Association
} from 'sequelize'
import { v4 as uuidv4 } from 'uuid';

class Ticket extends Model {
    ticketId!: string;

    enterAt!: Date;

    exitAt!: Date;

    parkinglotSlotId!: string;

    // public readonly ParkinglotSlots?: ParkinglotSlot[]

    // public static associations: {
    //   ParkinglotSlots: Association<ParkinglotSlot>
    // }

    public static initialize(sequelize: Sequelize) {
        this.init({
            ticketId: {
                field: 'ticket_id',
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: true,
            },
            enterAt: {
                field: 'enter_at',
                type: 'TIMESTAMP',
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            exitAt: {
                field: 'exit_at',
                type: 'TIMESTAMP',
                allowNull: true,
            },
            parkinglotSlotId: {
                field: 'parkinglot_slot_id',
                type: DataTypes.UUID,
                allowNull: true,
            }
        },
            {
                timestamps: false,
                sequelize,
                tableName: 'ticket',
                freezeTableName: true,
            }),
            Ticket.beforeCreate(async (ticket) => {
                ticket.ticketId = uuidv4();
            });
    }
}


export default Ticket

import {
    DataTypes, Model, Sequelize, Association
} from 'sequelize'
import { v4 as uuidv4 } from 'uuid';

class Vehicle extends Model {

    vehicleId!: string;

    numberPlate!: string;

    vehicleType!: number;

    enterAt!: Date;

    exitAt!: Date;

    ticketId!: string;

    // public readonly ParkinglotSlots?: ParkinglotSlot[]

    // public static associations: {
    //   ParkinglotSlots: Association<ParkinglotSlot>
    // }

    public static initialize(sequelize: Sequelize) {
        this.init({
            vehicleId: {
                field: 'vehicle_id',
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: true,
            },
            numberPlate: {
                field: 'number_plate',
                type: DataTypes.STRING,
                allowNull: false,
            },
            vehicleType: {
                field: 'vehicle_type',
                type: DataTypes.INTEGER,
                allowNull: false,
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
            ticketId: {
                field: 'ticket_id',
                type: DataTypes.UUID,
                allowNull: true,
            },
        },
            {
                timestamps: false,
                sequelize,
                tableName: 'vehicle',
                freezeTableName: true,
            }),
            Vehicle.beforeCreate(async (vehicle) => {
                vehicle.vehicleId = uuidv4();
            });
    }
}


export default Vehicle

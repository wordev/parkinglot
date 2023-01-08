import {
    DataTypes, Model, Sequelize,
} from 'sequelize'
import { v4 as uuidv4 } from 'uuid';

class ParkinglotSlot extends Model {

    parkinglotSlotId!: string;

    parkinglotId!: string;

    vehicleType!: number;

    isAvailable!: boolean;

    priority!: number;

    createdAt!: Date;

    updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        this.init({
            parkinglotSlotId: {
                field: 'parkinglot_slot_id',
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: true,
            },
            parkinglotId: {
                field: 'parkinglot_id',
                type: DataTypes.UUID,
                allowNull: false,
            },
            isAvailable: {
                field: 'is_available',
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            priority: {
                field: 'priority',
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            vehicleType: {
                field: 'vehicle_type',
                type: DataTypes.INTEGER,
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
        },
            {
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

                    parking.parkinglotSlotId = uuidv4();

                }

                // // Add `memberSince` to updateOnDuplicate otherwise it won't be persisted
                // if (options.updateOnDuplicate && !options.updateOnDuplicate.includes('memberSince')) {
                //     options.updateOnDuplicate.push('memberSince');
                // }
            });
    }
}



export default ParkinglotSlot

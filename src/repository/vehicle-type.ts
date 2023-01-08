import {
    DataTypes, Model, Sequelize, Association
} from 'sequelize'


class VehicleType extends Model {
    vehicleId!: string;

    vehicleType!: string;

    createdAt!: Date;

    // public readonly ParkinglotSlots?: ParkinglotSlot[]

    // public static associations: {
    //   ParkinglotSlots: Association<ParkinglotSlot>
    // }

    public static initialize(sequelize: Sequelize) {
        this.init({
            vehicleId: {
                field: 'vehicle_id',
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            vehicleType: {
                field: 'vehicle_type',
                type: DataTypes.STRING,
                allowNull: true,
            },
            createdAt: {
                field: 'created_at',
                type: 'TIMESTAMP',
                allowNull: true,
            },

        },
            {
                timestamps: false,
                sequelize,
                tableName: 'vehicle_type',
                freezeTableName: true,
            })
    }
}


export default VehicleType

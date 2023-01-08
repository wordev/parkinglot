import {
    DataTypes, Model, Sequelize,
} from 'sequelize'
import { v4 as uuidv4 } from 'uuid';

class Parkinglot extends Model {

    parkinglotId!: string;

    name!: string;

    smallSizeAmount!: number;

    mediumSizeAmount!: number;

    largeSizeAmount!: number;

    createdAt!: Date;

    updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        this.init({
            parkinglotId: {
                field: 'parkinglot_id',
                primaryKey: true,
                type: DataTypes.UUID,
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            smallSizeAmount: {
                field: 'small_size_amount',
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            mediumSizeAmount: {
                field: 'medium_size_amount',
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            largeSizeAmount: {
                field: 'large_size_amount',
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
                tableName: 'parkinglot',
                freezeTableName: true,
            }),
            Parkinglot.beforeCreate(async (parking) => {
                parking.parkinglotId = uuidv4();
            });
            
    }
}




export default Parkinglot

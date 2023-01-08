import { Options, Sequelize } from 'sequelize'

import Parkinglot from './parkinglot'
import ParkinglotSlot from './parkinglot-slot'
import Ticket from './ticket'
import Vehicle from './vehicle'
import VehicleType from './vehicle-type'



import config from '../config/config.json'

// Open database connection
const sequelize = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password,
    <Options>config.database,

)

// Initialize each model in the database
// This must be done before associations are made
let models = [Parkinglot, ParkinglotSlot, Ticket, Vehicle,VehicleType]
models.forEach(model => model.initialize(sequelize))

// One to Many FK defind in ParkinglotSlot
Parkinglot.hasMany(ParkinglotSlot, {
    foreignKey: {
        name: 'parkinglot_id',
        allowNull: false
    }
})
// One to One FK defind in Ticket
Ticket.belongsTo(ParkinglotSlot, {
    foreignKey: {
        name: 'parkinglot_slot_id',
        allowNull: true
    }
})

// One to One FK defind in Vehicle
Vehicle.belongsTo(Ticket, {
    foreignKey: {
        name: 'ticket_id',
        allowNull: true
    }
})

sequelize.sync({ force: false })

export { 
    sequelize as Database,
    Parkinglot,
    ParkinglotSlot,
    Ticket,
    Vehicle,
    VehicleType
}
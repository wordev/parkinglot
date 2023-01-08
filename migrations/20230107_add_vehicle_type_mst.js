module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vehicle_type', [{
      vehicle_id: 1,
      vehicle_type: 'SMALL',
      created_at: new Date().toISOString()
    }, {
      vehicle_id: 2,
      vehicle_type: 'MEDIUM',
      created_at: new Date().toISOString()
    }, {
      vehicle_id: 3,
      vehicle_type: 'LARGE',
      created_at: new Date().toISOString()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vehicle_type', {
      vehicle_id: {
        [Sequelize.Op.in]: ['1', '2', '3']
      }
    }, {})
  }
}

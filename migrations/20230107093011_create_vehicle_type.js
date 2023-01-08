module.exports = {
    up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.sequelize.query(`
          create table vehicle_type
          (
            vehicle_id varchar(255) not null,
            vehicle_type varchar(255),
            created_at  timestamp
          );
        `)
      ])
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.query(`
        DROP TABLE vehicle_type;
      `)
    }
  }
  
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique:true
      },
      type: {
        type: Sequelize.STRING
      },
      actor: {
        type: Sequelize.JSON
      },
      repo: {
        type: Sequelize.JSON
      },
      created_at: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Comments', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    });
        
 },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Comments', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    });
 }
};
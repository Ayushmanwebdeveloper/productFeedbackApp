'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Comments', 'FeedbackId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Feedbacks', key: 'id' },
    });
        
 },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Comments', 'FeedbackId', {
      type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Feedbacks', key: 'id' },
    });
 }
};
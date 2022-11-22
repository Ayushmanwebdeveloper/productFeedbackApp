'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'cascade'
      },
      feedbackId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Feedbacks', key: 'id' },
        onDelete: 'cascade'
      },
      replies: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Replies', key: 'id' }
      }

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};
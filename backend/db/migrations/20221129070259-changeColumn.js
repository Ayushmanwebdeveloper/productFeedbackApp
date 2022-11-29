'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Feedbacks', 
  'userId', 'UserId');
 },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Feedbacks', 'UserId', 'userId');
 }
};
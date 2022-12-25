'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Comments', 
  'userId', 'UserId');
 },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Comments', 'UserId', 'userId');
 }
};
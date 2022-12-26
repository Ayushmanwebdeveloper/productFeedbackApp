'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Comments', 
  'feedbackId', 'FeedbackId');
 },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Comments', 'FeedbackId', 'feedbackId');
 }
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Replies', 
  'commentId', 'CommentId');
 },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Replies', 'CommentId', 'commentId');
 }
};
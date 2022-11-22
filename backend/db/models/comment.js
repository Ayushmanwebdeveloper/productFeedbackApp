'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [1, 255],
      }
    }
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};
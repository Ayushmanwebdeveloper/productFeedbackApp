'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    content:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [1, 255],
      }
    },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    CommentId: { type: DataTypes.INTEGER, allowNull: false },
  }, {});
  Reply.associate = function(models) {
    // associations can be defined here
    Reply.belongsTo(models.Comment);
    Reply.belongsTo(models.User);
  };
  return Reply;
};
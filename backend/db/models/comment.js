'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [1, 255],
      }
    },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    FeedbackId: { type: DataTypes.INTEGER, allowNull: false },
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User);
    Comment.hasMany(models.Reply, { foreignKey: "CommentId", onDelete: "cascade" });
    Comment.belongsTo(models.Feedback);
};
  return Comment;
};
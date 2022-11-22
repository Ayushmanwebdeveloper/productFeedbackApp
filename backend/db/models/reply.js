'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    content:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [1, 255],
      }
    }
  }, {});
  Reply.associate = function(models) {
    // associations can be defined here
  };
  return Reply;
};
"use strict";
const { Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    "Feedback",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50],
        },
      },
      category: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      upvotes: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Feedback.associate = function (models) {
    // associations can be defined here
    Feedback.belongsTo(models.User);
    Feedback.hasMany(models.Comment);
  };
  return Feedback;
};

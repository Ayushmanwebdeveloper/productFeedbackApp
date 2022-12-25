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
      UserId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Feedback.associate = function (models) {
    // associations can be defined here
    Feedback.belongsTo(models.User);
    Feedback.hasMany(models.Comment);
  };
  Feedback.add = async function ({ title, category, status, description, upvotes, UserId }) {
    const feedback = await Feedback.create({
      title,
      category,
      status,
      description,
      upvotes,
      UserId,
    });
    return await Feedback.findByPk(feedback.id);
};
  Feedback.edit = async function ({ id, title, category, status, description, upvotes, UserId }) {
    const feedback = await Feedback.findByPk(id);
    await feedback.update({
      title,
      category,
      status,
      description,
      upvotes,
      UserId,
    });
    return await Feedback.findByPk(feedback.id);
  };
  Feedback.delete = async function ({ id }) {
    const feedback = await Feedback.findByPk(id);
    await feedback.destroy();
    return feedback;
  };
  return Feedback;
};
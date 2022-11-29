const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Users", deps: []
 * createTable() => "Feedbacks", deps: [Users, Users]
 * createTable() => "Comments", deps: [Users, Feedbacks, Users]
 * createTable() => "Replies", deps: [Comments, Comments, Users, Users]
 *
 */

const info = {
  revision: 1,
  name: "feedback",
  created: "2022-11-28T14:29:24.280Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          field: "username",
          allowNull: false,
        },
        email: { type: Sequelize.STRING, field: "email", allowNull: false },
        hashedPassword: {
          type: Sequelize.STRING.BINARY,
          field: "hashedPassword",
          allowNull: false,
        },
        avatar: { type: Sequelize.STRING, field: "avatar", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Feedbacks",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        title: { type: Sequelize.STRING, field: "title", allowNull: false },
        category: {
          type: Sequelize.STRING,
          field: "category",
          allowNull: false,
        },
        status: { type: Sequelize.STRING, field: "status", allowNull: false },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: false,
        },
        upvotes: {
          type: Sequelize.INTEGER,
          field: "upvotes",
          allowNull: false,
        },
        UserId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Users", key: "id" },
          field: "UserId",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Comments",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        content: { type: Sequelize.STRING, field: "content", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        UserId: {
          type: Sequelize.INTEGER,
          field: "UserId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
        FeedbackId: {
          type: Sequelize.INTEGER,
          field: "FeedbackId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Feedbacks", key: "id" },
          allowNull: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Replies",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        content: { type: Sequelize.STRING, field: "content", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        commentId: {
          type: Sequelize.INTEGER,
          field: "commentId",
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: { model: "Comments", key: "id" },
          allowNull: true,
        },
        CommentId: {
          type: Sequelize.INTEGER,
          field: "CommentId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Comments", key: "id" },
          allowNull: true,
        },
        UserId: {
          type: Sequelize.INTEGER,
          field: "UserId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Comments", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Feedbacks", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Replies", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};

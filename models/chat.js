var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var Chat = sequelize.define("chirp", {
  author: Sequelize.STRING,
  body: Sequelize.STRING,
  created_at: Sequelize.DATE
});

Chat.sync();

module.exports = Chat;
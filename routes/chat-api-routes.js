var Chat = require("../models/chat.js");

module.exports = function (app) {
  app.get("/api/all", function(req, res) {
    Chat.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/new", function(req, res) {
    console.log("Chat Data:");
    console.log(req.body);

    Chat.create({
      author: req.body.author,
      body: req.body.body,
      created_at: req.body.created_at
    }).then(function(results) {
      res.end();
    });
  });
};
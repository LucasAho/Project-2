var db = require("../models");

module.exports = function(app) {
  // App gets
  app.get("/api/users/:email", function(req, res) {
    db.User.findOne({ where: { email: req.params.email } }).then(function(
      dbUsers
    ) {
      res.json(dbUsers);
    });
  });
  app.get("/api/npcs", function(req, res) {
    db.NPC.findAll({}).then(function(dbNpcs) {
      res.json(dbNpcs);
    });
  });
  app.get("/api/chars", function(req, res) {
    db.Char.findAll({}).then(function(dbChars) {
      res.json(dbChars);
    });
  });
  app.get("/api/npcs/:id", function(req, res) {
    db.NPC.findOne({ where: { id: req.params.id } }).then(function(dbNpcs) {
      res.json(dbNpcs);
    });
  });

  // App posts
  app.post("/api/npcs", function(req, res) {
    db.NPC.create(req.body).then(function(dbNPC) {
      res.json(dbNPC);
    });
  });
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  app.post("api/chars", function(req, res) {
    console.log(req.body);
    db.Char.create(req.body).then(function(dbChar) {
      res.json(dbChar);
    });
  });

  // App deletes
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  //chat
  app.get("/api/chats", function(req, res) {
    db.User.findAll({ include: [db.Post] }).then(function(dbChat) {
      res.json(dbChat);
    });
  });
  app.get("/api/chats/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id }, include: [db.Post] }).then(
      function(dbChat) {
        res.json(dbChat);
      }
    );
  });
  app.post("/api/chats", function(req, res) {
    db.User.create(req.body).then(function(dbChat) {
      res.json(dbChat);
    });
  });
};

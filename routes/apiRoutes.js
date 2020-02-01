var db = require("../models");

module.exports = function(app) {
  // App gets
  app.post("/api/users/", function(req, res) {
    db.User.findOne({ where: { email: req.body.email, pass: req.body.pass } }).then(function(dbUsers) {
      console.log("test regular one");
      res.json(dbUsers);
    });
  });

  app.get("/api/npcs", function(req, res) {
    db.NPC.findAll({}).then(function(dbNpcs) {
      res.json(dbNpcs);
    });
  });
  app.get("/api/locales", function(req, res) {
    db.Locale.findAll({}).then(function(dbLocales) {
      res.json(dbLocales);
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
  app.get("/api/chats", function(req, res) {
    db.Post.findAll({ include: [db.Post] }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  app.get("/api/chats/:id", function(req, res) {
    db.Post.findOne({ where: { id: req.params.id }, include: [db.Post] }).then(
      function(dbPost) {
        res.json(dbPost);
      }
    );
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
  app.post("/api/chars", function(req, res) {
    db.Char.create(req.body).then(function(dbChar) {
      res.json(dbChar);
    });
  });
  app.post("/api/locales", function(req, res) {
    db.Locale.create(req.body).then(function(dbLocale) {
      res.json(dbLocale);
    });
  });
  app.post("/api/chats", function(req, res) {
    db.Post.create(req.body).then(function(dbChats) {
      res.json(dbChats);
    });
  });

  // App deletes
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};

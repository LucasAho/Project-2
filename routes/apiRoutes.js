var db = require("../models");

module.exports = function(app) {
  // App gets
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
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
  app.post("/api/logins", function(req, res) {
    db.User.findOne({ where: { email: req.body.email, pass: req.body.pass } }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.post("/api/locales", function(req, res) {
    db.Locale.create(req.body).then(function(dbLocale) {
      res.json(dbLocale);
    });
  });

  // App deletes
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};

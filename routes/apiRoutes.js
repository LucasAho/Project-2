var db = require("../models");
module.exports = function(app) {
  // App gets

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

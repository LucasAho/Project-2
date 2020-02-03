var db = require("../models");

module.exports = function(app) {
  app.get("/api/post", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  app.get("/api/post/:id", function(req, res) {
    db.Post.findOne({ where: { id: req.params.id }}).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  app.post("/api/chat", function(req, res) {
    console.log("checking");
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

};

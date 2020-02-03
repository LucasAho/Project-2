var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      console.log("test regular one");
      res.json(dbUsers);
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
};

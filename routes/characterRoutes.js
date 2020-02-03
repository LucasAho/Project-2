/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function (app) {
  app.get("/api/chars", function(req, res) {
    db.Char.findAll({}).then(function(dbChars) {
      res.json(dbChars);
    });
  });
  app.post("/api/chars", function(req, res) {
    //need to set userid here
    db.Char.create(req.body).then(function(dbChar) {
      res.json(dbChar);
    });
  });
  
};

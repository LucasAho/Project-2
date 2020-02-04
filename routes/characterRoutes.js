/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function (app) {
  app.get("/api/chars/:id", function(req, res) {
    db.Char.findAll({ where : {UserId : req.params.id} }).then(function(dbChars) {
      res.json(dbChars);
    });
  });
  app.post("/api/getChar/:id", function(req, res) {
    console.log(req.params.id);
    db.Char.findOne({ where : {id : req.params.id} }).then(function(dbChar) {
      console.log(dbChar);
      res.json(dbChar);
    });
  });
  app.post("/api/chars/:id", function(req, res) {
    var reqBod = req.body;
    reqBod.UserId = req.params.id;
    db.Char.create(reqBod).then(function(dbChar) {
      res.json(dbChar);
    });
  });
  
};

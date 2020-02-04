var db = require("../models");

module.exports = function(app) {
  app.post("/api/chat/:id", function(req, res) {
    var reqBod = req.body;
    
    reqBod.UserId = parseInt(req.params.id);
    console.log(req.params.id);
    db.Post.create({...req.body, UserId: req.params.id}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

};

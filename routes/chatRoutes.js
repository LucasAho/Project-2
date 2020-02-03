var db = require("../models");

module.exports = function(app) {
  app.post("/api/chat/:id", function(req, res) {
    var reqBod = req.body;
    reqBod.UserId = req.params.id;
    db.Post.create(reqBod).then(function(dbPost) {
      res.json(dbPost);
    });
  });

};

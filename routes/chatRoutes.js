var db = require("../models");

module.exports = function(app) {
  app.post("/api/chat/:id", function(req, res) {
    console.log(req.params.id);
    var reqBod = req.body;
    reqBod.UserId = req.params.id;
    console.log(reqBod);
    db.Post.create(reqBod).then(function(dbPost) {
      res.json(dbPost);
    });
  });

};

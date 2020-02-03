var db = require("../models");

module.exports = function(app) {
  app.post("/api/chat/:UserId", function(req, res) {
    console.log(req.params.UserId);
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

};

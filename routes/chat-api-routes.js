var db = require("../models");

module.exports = function(app) {
  //find all post from specific user?
  app.get("/api/post", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    //should this be findOne instead??
    db.Post.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  //posting new chat message
  app.post("/api/post", function(req, res) {
    console.log("Chat Data:");
    console.log(req.body);

    db.Post.create({
      author: req.body.author,
      body: req.body.body,
      created_at: req.body.created_at
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};

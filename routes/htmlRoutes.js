var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.users.findAll({}).then(function(users) {
      res.render("index", {
        msg: "Welcome!",
        examples: users
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/npcs/:id", function(req, res) {
    db.NPC.findOne({ where: { id: req.params.id } }).then(function(npcs) {
      res.render("npcs", {
        example: npcs
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

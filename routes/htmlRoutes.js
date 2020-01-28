var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {
      msg: "Welcome!"
    });
  });

  app.get("/dm", (req, res) => {
    res.render("dmUser");
  });

  app.get("/player", (req,res) => {
    res.render("player");
  });



  // // Load example page and pass in an example by id
  // app.get("/npcs/:id", function(req, res) {
  //   db.NPC.findOne({ where: { id: req.params.id } }).then(function(npcs) {
  //     res.render("npcs", {
  //       npcs: npcs
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

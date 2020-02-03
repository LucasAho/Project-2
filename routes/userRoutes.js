var db = require("../models");
var bcrypt = require("bcryptjs");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      console.log("test regular one");
      res.json(dbUsers);
    });
  });
  app.post("/api/register", function(req, res) {
    var reqBod = req.body;
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.pass, salt, function(err, hash) {
        reqBod.pass = hash;
        db.User.create(reqBod).then(function(data) {
          if (data) {
            res.json(data);
          }
        });
      });
    });
  });
  app.post("/logins", function(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      if (!user) {
        res.send("Sorry, that doesn't match");
      } else {
        bcrypt.compare(req.body.pass, user.pass, function(err, result) {
          if (result == true) {
            if (user.actType == 0) {
              res.redirect("/dm/" + user.id);
            } else if (result == 1) {
              res.redirect("/player/" + user.id);
            } else {
              res.send("Incorrect Password");
            }
          }
        });
      }
    });
  });
};

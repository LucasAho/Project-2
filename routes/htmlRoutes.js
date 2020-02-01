var db = require("../models");
var axios = require("axios");
// var Chatkit = require("@pusher/chatkit-server");
// var chatkit = new Chatkit.default({
//   instanceLocator: 'v1:us1:c70a1536-cdbd-4df5-8b0c-11a8df75c578',
//   key:
//     '7f860eac-0ece-4142-9736-52b7ba80411f:7hXr4tAtbxOAU79ldb+08uRqas7wX6wvEEQ1RW17l9w='
// });

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome!"
    });
  });

  app.get("/dm", (req, res) => {
    
    db.NPC.findAll({}).then(dbNpcs => {
      res.render("dmUser", {
        npcs: dbNpcs
      });
    });

    db.Locale.findAll({}).then(dbLocales => {
      res.render("dmUser", {
        locales: dbLocales
      });
    });
  });

  app.get("/player", (req, res) => {
    db.Char.findAll({
    }).then(dbChars => {
      res.render("player", { 
        chars: dbChars
      });
    });
    
  });

  app.get('/search/:category/:search', (req, res) => {
    var queryURL = "http://dnd5eapi.co/api/" + req.params.category + '/' + req.params.search;
    axios.get(queryURL).then(function (response) {
      res.json(response.data);
    }).catch(err => {
      console.log(err);
    });

  });


  //chatkit added sj
  app.post('/users', (req, res) => {
    var { username } = req.body
    chatkit
      .createUser({
        id: username,
        name: username
      })
      .then(() => {
        console.log(`User created: ${username}`)
        res.sendStatus(201)
      })
      .catch(err => {
        if (err.error === 'services/chatkit/user_already_exists') {
          console.log(`User already exists: ${username}`)
          res.sendStatus(200)
        } else {
          res.status(err.status).json(err)
        }
      });
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
  app.get("*", function (req, res) {
    res.render("404");
  });
};


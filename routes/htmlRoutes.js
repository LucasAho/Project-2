var db = require("../models");
var axios = require("axios");


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
  });
  app.get("/dm", (req, res) => {
    db.Locale.findAll({}).then(dbLocales => {
      res.render("dmUser", {
        locales: dbLocales
      });
    });  
  });

  //chat
  app.get("/player/:user", (req, res) => {
    var thisUser = req.params.user;
    db.Char.findAll({ where: {user_id: thisUser} }).then(dbChars => {
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

  //chat
  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads blog.html
  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // authors route loads author-manager.html
  app.get("/authors", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  });

  //chatkit added sj
  app.post('/users', (req, res) => {
    var { username } = req.body
    chatkit.createUser({
        id: username,
        name: username
      })
      .then(() => {
        res.render(`User created: ${username}`)
        // res.sendStatus(201)
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


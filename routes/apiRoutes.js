var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users/:email", function(req, res) {
    db.User.findOne({ where: { email: req.params.email } }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
  app.get("/api/npcs", function(req, res) {
    db.NPC.findAll({}).then(function(dbNpcs) {
      res.json(dbNpcs);
    });
  });
  app.get("/api/npcs/:id", function(req, res) {
    db.NPC.findOne({ where: { id: req.params.id } }).then(function(dbNpcs) {
      res.json(dbNpcs);
    });
  });
  // Create a new example
  app.post("/api/npcs", function(req, res) {
    db.NPC.create(req.body).then(function(dbNPC) {
      res.json(dbNPC);
    });
  });
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  
  //chat
  app.get("/api/user", function(req, res) {
    db.User.findAll({
      include: [db.Post]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id }, include: [db.Post]}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/authors", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  
  // //chatkit added sj
  app.post('/authenticate', (req, res) => {
    db.chatkit.authenticate({ userId: req.query.user_id })
    res.status(authData.status).send(authData.body)
  })
};

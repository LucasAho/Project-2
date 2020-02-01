require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
// var bodyParser = require("body-parser");
var cors = require("cors");

var db = require("./models");
// var Chatkit = require("@pusher/chatkit-server");
// var chatkit = new Chatkit.default({
//   instanceLocator: 'v1:us1:c70a1536-cdbd-4df5-8b0c-11a8df75c578',
//   key:
//     '7f860eac-0ece-4142-9736-52b7ba80411f:7hXr4tAtbxOAU79ldb+08uRqas7wX6wvEEQ1RW17l9w='
// });

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

const mongoose = require("mongoose");
const config = require("../default/default.js");
mongoose.connect(config.mongoURI);
// mongoose.connect("mongodb://localhost/ordering_System");

const db = mongoose.connection;
// to console error messages
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;

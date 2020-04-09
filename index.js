const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.port || 8000;
const app = express();
const db = require("./config/mongoose");
const path = require("path");
app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use("/", require("./routes"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("clien/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, function (err) {
  if (err) {
    console.log(`error ocuured: ${err}`);
    return;
  }
  console.log(`server running at port:${port}`);
});

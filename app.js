require("dotenv").config();
var express = require("express");
var config1 = require("./config/db");
var config = "./config/config";
var http = require("http");

// var dotenv = require("dotenv").config();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var compress = require("compression");

var cors = require("cors");
var userRoutes = require("./routes/user.routes");
var authRoutes = require("./routes/auth.routes");
var buyPlantRoutes = require("./routes/buyplant.routes");
var plantBalance = require("./routes/balance.routes");
var profile = require("./routes/profile.routes");
var payment = require("./routes/payment");
var port = process.env.PORT || 80;

var app = express();
var server = http.createServer(app);

//comment out before building for production
app.use(cors());
// parse body params and attache them to req.body
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers

// enable CORS - Cross Origin Resource Sharing

// mount routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", plantBalance);
app.use("/", buyPlantRoutes);
app.use("/", profile);
app.use("/", payment);
// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

server.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", process.env.PORT || 5000);
});

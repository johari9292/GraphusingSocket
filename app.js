const express = require("express");
var config = require("./config/db");
const dotenv = require("dotenv").config();
const http = require("http");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

const port = process.env.PORT || 80;
const app = express();
const server = http.createServer(app);

//comment out before building for production
app.use(cors());
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers

// enable CORS - Cross Origin Resource Sharing

// mount routes
app.use("/", userRoutes);
app.use("/", authRoutes);

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;

server.listen(port, () => console.log(`Listening on port ${port}`));

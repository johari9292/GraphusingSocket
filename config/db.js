
const mongoose = require("mongoose");

// const connectionstr =  "mongodb://localhost:27017/local";
const connectionstr = "mongodb+srv://joharibalti1996:is119821885@cluster0-jjj5l.mongodb.net/test?retryWrites=true&w=majority";
// const MONGO_URI = "mongodb://joharibalti:is119821885@ds227352.mlab.com:27352/heroku_1kkl8s2q"



mongoose.connect(connectionstr ,{useCreateIndex: true, useNewUrlParser: true }).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);


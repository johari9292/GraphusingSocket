const mongoose = require("mongoose");

// const connectionstr =  "mongodb://localhost:27017/local";
const MONGO_URI =
  // "mongodb+srv://joharibalti1996:is119821885@cluster0-jjj5l.mongodb.net/test?retryWrites=true&w=majority";
  "mongodb+srv://joharibalti1996:is119821885@gaveagroplataforma.ynzpg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connection established!");
    },
    (err) => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );

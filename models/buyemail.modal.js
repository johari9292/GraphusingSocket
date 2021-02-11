const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ByEmail = new Schema({
  name: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  plant: {
    type: String,
  },
  price: {
    type: String,
  },
  job: {
    type: String,
  },
});

module.exports = mongoose.model("ByEmail", ByEmail);

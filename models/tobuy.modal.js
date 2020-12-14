const mongoose = require("mongoose");

const ToBuySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
  plots: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
  hectares: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
  totalplant: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
  price: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
  plantdate: {
    type: Date,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
});

module.exports = mongoose.model("ToBuy", ToBuySchema);

const mongoose = require("mongoose");

const PlantBalancesSchema = new mongoose.Schema({
  _id: {
    type: String,
    trim: true,
    unique: "User already exists",

    // required: "user is required",
  },
  balance: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
  plantbalance: {
    type: String,
    trim: true,
    // required: "Name is required",
  },

  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PlantBalances", PlantBalancesSchema);

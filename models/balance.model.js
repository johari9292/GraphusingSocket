const mongoose = require("mongoose");

const PlantBalancesSchema = new mongoose.Schema({
  user: {
    type: String,
    trim: true,
    // unique: true,
    // required: true,
    // dropDups: true,

    // required: "user is required",
  },
  year: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
  name: {
    type: String,
    trim: true,
    // required: "Name is required",
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
  investeddate: {
    type: Date,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PlantBalances", PlantBalancesSchema);

const mongoose = require("mongoose");

const ToBuySchema = new mongoose.Schema({
  user: {
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

  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ToBuy", ToBuySchema);

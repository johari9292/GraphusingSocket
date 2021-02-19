const mongoose = require("mongoose");

const PaymentsSchema = new mongoose.Schema({
  user: {
    type: String,
    trim: true,
  },
  bank: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
  name: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
  amount: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
  image: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
  account: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
  date: {
    type: Date,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payments", PaymentsSchema);

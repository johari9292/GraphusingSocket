const mongoose = require("mongoose");

const UserBalancessSchema = new mongoose.Schema({
  user: {
    type: String,
    trim: true,
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
  species: {
    type: String,
    trim: true,
    // required: "Name is required",
  },
  investeddate: {
    type: Date,
  },
  url: {
    type: String,
    trim: true,
  },
  lat: {
    type: String,
    trim: true,
  },
  lng: {
    type: String,
    trim: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserBalancess", UserBalancessSchema);

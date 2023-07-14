const mongoose = require("mongoose");

// Amount model
const amountSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 180,
    get: (v) => Math.round(v), // Ensure the value is rounded
    set: (v) => Math.round(v), // Ensure the value is rounded
    min: 0, // Optional: minimum value constraint
  },
});

module.exports = mongoose.model("Amount", amountSchema);

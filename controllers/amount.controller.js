const Amount = require("../models/amount.modal");

// GET /api/Amounts
const getAmount = (req, res) => {
  // Retrieve the amount
  Amount.findOne({}, (err, amount) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!amount) {
      return res.status(404).json({ error: "Amount not found" });
    }
    res.json(amount);
  });
};

// PUT /api/Amounts
const updateAmount = (req, res) => {
  // Retrieve the amount
  Amount.findOne({}, (err, amount) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!amount) {
      return res.status(404).json({ error: "Amount not found" });
    }

    // Update the amount
    amount.amount = req.body.amount;
    amount.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(amount);
    });
  });
};

module.exports = {
  getAmount,
  updateAmount,
};

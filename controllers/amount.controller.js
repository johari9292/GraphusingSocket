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
      const newAmount = new Amount({
        amount: 180, // Set the value for the amount attribute
      });

      // Save the new Amount to the database
      newAmount.save((err, savedAmount) => {
        if (err) {
          console.error(err);
          // Handle the error appropriately
        } else {
          console.log("Amount added:", savedAmount);
          // Perform any desired operations with the savedAmount object
        }
      });
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

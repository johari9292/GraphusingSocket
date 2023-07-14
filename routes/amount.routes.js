const express = require("express");
const router = express.Router();
const amountController = require("../controllers/amount.controller");

// GET /api/
router.route("/get-amount").get(amountController.getAmount);

// router.get("/", amountController.getAmount);

// PUT /api/amount
// router.put("/", amountController.updateAmount);
router.route("/update-amount").put(amountController.updateAmount);

module.exports = router;

const express = require("express");
const Payment = require("../controllers/payment.controller");

const router = express.Router();

router.route("/getadminpayment").get(Payment.getPayments);

router.route("/getpayment/:id").get(Payment.getPaymentsByUser);

router.route("/addpayment/").post(Payment.addPayment);

router.route("/deletepayment/:id").delete(Payment.deletePayment);
router.route("/updatepayment/:id").post(Payment.updatePayment);
module.exports = router;

const express = require("express");
const Payment = require("../controllers/payment.controller");

const router = express.Router();

router.route("/getpayment/:id").get(Payment.gettodo);

router.route("/getpayment/").get(Payment.gettodobyid);

router.route("/addpayment/").post(Payment.addtodo);

router.route("/deletepayment/:id").delete(Payment.deletetodo);
router.route("/updatepayment/:id").post(Payment.updatetodo);
module.exports = router;

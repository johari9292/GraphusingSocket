const express = require("express");
const balanceController = require("../controllers/balance.controller");

const router = express.Router();

router.route("/getbalance/:id").get(balanceController.getUserBalance);

router.route("/getbalanceforadmin/").get(balanceController.getBalanceById);

router.route("/addbalance").post(balanceController.addBalance);

router.route("/deletebalance/:id").delete(balanceController.deleteBalance);
router.route("/updatebalance/:id").post(balanceController.updateBalance);
module.exports = router;

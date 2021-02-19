const express = require("express");
const balanceController = require("../controllers/balance.controller");

const router = express.Router();

router.route("/getbalance/:id").get(balanceController.getuserBalance);

router.route("/getbalanceforadmin/").get(balanceController.gettodobyid);

router.route("/addbalance").post(balanceController.addtodo);

router.route("/deletebalance/:id").delete(balanceController.deletetodo);
router.route("/updatebalance/:id").post(balanceController.updatetodo);
module.exports = router;

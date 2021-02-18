const express = require("express");
const balanceController = require("../controllers/balance.controller");

const router = express.Router();

router.route("/getbalance/:id").get(balanceController.gettodo);

router.route("/getbalanceforadmin/").get(balanceController.gettodobyid);

router
  .route("/addbalance")
  .post(balanceController.addtodo)
  .options(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    return res.send(200);
  });

router.route("/deletebalance/:id").delete(balanceController.deletetodo);
router.route("/updatebalance/:id").post(balanceController.updatetodo);
module.exports = router;

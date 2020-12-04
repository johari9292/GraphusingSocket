const express = require("express");
const buyPlantController = require("../controllers/balance.controller");

const router = express.Router();

router.route("/getbalance").get(buyPlantController.gettodo);

router.route("/getbalance/:id").get(buyPlantController.gettodobyid);

router.route("/addbalance").post(buyPlantController.addtodo);

router.route("/deletebalance/:id").delete(buyPlantController.deletetodo);
router.route("/updatebalance/:id").post(buyPlantController.updatetodo);
module.exports = router;

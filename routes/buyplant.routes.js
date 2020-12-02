const express = require("express");
const buyPlantController = require("../controllers/buyplant.controller");

const router = express.Router();

router.route("/getbuyplant").get(buyPlantController.gettodo);

router.route("/getbuyplant/:id").get(buyPlantController.gettodobyid);

router.route("/addbuyplant").post(buyPlantController.addtodo);

router.route("/deletebuyplant/:id").delete(buyPlantController.deletetodo);
router.route("/updatebuyplant/:id").post(buyPlantController.updatetodo);
module.exports = router;

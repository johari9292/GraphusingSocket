const express = require("express");
const buyPlantController = require("../controllers/buyplant.controller");
const BuyEmailController = require("../controllers/tobuymail.controller");
const router = express.Router();

router.route("/sendemail").post(BuyEmailController.buyEmail);
router.route("/sellemail").post(BuyEmailController.sellEmail);
router.route("/getbuyplant").get(buyPlantController.getBuyPlants);

router.route("/getbuyplant/:id").get(buyPlantController.getBuyPlantById);

router.route("/addbuyplant").post(buyPlantController.addBuyPlant);

router.route("/deletebuyplant/:id").delete(buyPlantController.deleteBuyPlant);
router.route("/updatebuyplant/:id").post(buyPlantController.updateBuyPlant);
module.exports = router;

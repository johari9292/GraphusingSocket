const express = require("express");
const buyPlantController = require("../controllers/profile.controller");

const router = express.Router();

router.route("/getuserupdate").get(buyPlantController.gettodo);

router.route("/getuserupdate/:id").get(buyPlantController.gettodobyid);

router.route("/addbuyplant").post(buyPlantController.addtodo);

router.route("/deletebuyplant/:id").delete(buyPlantController.deletetodo);
router.route("/updateuser/:id").post(buyPlantController.updatetodo);
module.exports = router;

const express = require("express");
const ProfileController = require("../controllers/profile.controller");

const router = express.Router();

router.route("/getuserupdate").get(ProfileController.getProfiles);

router.route("/getuserupdate/:id").get(ProfileController.getProfileById);

router.route("/addbuyplant").post(ProfileController.addProfile);

router.route("/deletebuyplant/:id").delete(ProfileController.deleteProfile);
router.route("/updateuser/:id").post(ProfileController.updateProfile);
module.exports = router;

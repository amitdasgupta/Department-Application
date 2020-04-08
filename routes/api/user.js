const auth = require("../../middleware/auth.js");
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user_controller");

router.get("/generatedata", userController.generateData);
router.get("/allcomponents", userController.giveComponents);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;

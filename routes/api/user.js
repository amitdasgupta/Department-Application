const auth = require("../../middleware/auth.js");
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user_controller");

router.get("/generatedata", [auth], userController.generateData);
router.get("/allcomponents", [auth], userController.giveComponents);
router.get("/purchase/:cid", [auth], userController.purchaseComponents);
router.get("/componentpage/:cid", [auth], userController.componentDetail);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;

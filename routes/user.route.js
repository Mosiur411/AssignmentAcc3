/* external import */
const express = require("express");

/* internal import */
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/verify.middleware");

/* router level connection */
const router = express.Router();

router.post("/signup", userController.registerAnUser);
router.post("/login", userController.loginAnUser);
router.get("/me", verifyToken, userController.getMe);

module.exports = router;

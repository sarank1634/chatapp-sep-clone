const express = require("express");
const router = express.Router();
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");

//register api
router.post("/register", registerUser);

//check email api
router.post("/email", checkEmail);

module.exports = router;

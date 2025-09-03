const express = require("express");
const router = express.Router();
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");

//register api
router.post("/register", registerUser);

//check email api
router.post("/email", checkEmail);

//check password api
router.post("/password", checkPassword);

module.exports = router;

const express = require("express");
const router = express.Router();
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDetails = require("../controller/UserDetails");

//register api
router.post("/register", registerUser);

//check email api
router.post("/email", checkEmail);

//check password api
router.post("/password", checkPassword);

//login user details api
router.get("/user-details", userDetails);

module.exports = router;

const express = require("express");
const router = express.Router();
const registerUser = require("../controller/registerUser");

//register api
router.post("/register", registerUser);


module.exports = router;

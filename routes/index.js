const express = require("express");
const router = express.Router();
const diaryApi = require("./diary.api");
const userApi = require("./user.api");
const authApi = require("./auth.api");

router.use("/diary", diaryApi);
router.use("/user", userApi);
router.use("/auth", authApi);

module.exports = router;

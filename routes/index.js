const express = require("express");
const router = express.Router();
const diaryApi = require("./diary.api");
const userApi = require("./user.api");

router.use("/diary", diaryApi);
router.use("/user", userApi);

module.exports = router;

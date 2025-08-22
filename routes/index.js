const express = require("express");
const router = express.Router();
const diaryApi = require("./diary.api");

router.use("/diary", diaryApi);

module.exports = router;

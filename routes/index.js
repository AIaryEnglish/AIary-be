const express = require("express");
const router = express.Router();
const diaryApi = require("./diary.api");
const vocaApi = require("./vocab.api");

router.use("/diary", diaryApi);
router.use("/vocab", vocaApi);

module.exports = router;

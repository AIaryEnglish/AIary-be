const express = require("express");
const diaryController = require("../controllers/diary.controller");
const router = express.Router();

router.get("/", diaryController.getAllDiaries);

module.exports = router;

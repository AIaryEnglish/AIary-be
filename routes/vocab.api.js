const express = require("express");
const router = express.Router();
const vocabController = require("../controllers/vocab.controller");

router.get("/:diaryId", vocabController.getAllWords);

module.exports = router;

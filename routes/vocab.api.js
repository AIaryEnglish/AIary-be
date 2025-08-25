const express = require("express");
const router = express.Router();
const vocabController = require("../controllers/vocab.controller");

router.get("/:diaryId", vocabController.getAllWords);
router.post("/:id", vocabController.toggleStatus);
router.delete("/:id", vocabController.deleteWord);

module.exports = router;

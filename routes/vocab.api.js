const express = require("express");
const router = express.Router();
const vocabController = require("../controllers/vocab.controller");
const authController = require("../controllers/auth.controller");

router.get("/", authController.authenticate, vocabController.getAllWords);
router.post("/:id", authController.authenticate, vocabController.toggleStatus);
router.delete("/:id", authController.authenticate, vocabController.deleteWord);

module.exports = router;

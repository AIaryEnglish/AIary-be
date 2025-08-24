const express = require("express");
const diaryController = require("../controllers/diary.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.get("/", diaryController.getAllDiaries);
router.get(
  "/my",
  authController.authenticate,
  diaryController.getOneUserDiaries
);
router.get(
  "/my/date",
  authController.authenticate,
  diaryController.getDiaryByDate
);

module.exports = router;

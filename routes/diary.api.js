const express = require("express");
const diaryController = require("../controllers/diary.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/", authController.authenticate, diaryController.createDiary);
router.get("/", diaryController.getAllDiaries);
router.get(
  "/my/month",
  authController.authenticate,
  diaryController.getUserDiariesByMonth
);
router.get(
  "/my/date",
  authController.authenticate,
  diaryController.getUserDiaryByDate
);

module.exports = router;

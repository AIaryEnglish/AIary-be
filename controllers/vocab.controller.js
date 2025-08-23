const mongoose = require("mongoose");
require("../models/Diary");
const Vocabook = require("../models/Vocabook");

const vocabController = {};

// 특정 다이어리의 단어 목록 가져오기
vocabController.getAllWords = async (req, res) => {
  try {
    const vocabList = await Vocabook.find({ diaryId: req.params.diaryId }).sort(
      { createdAt: -1 }
    );
    res.json(vocabList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = vocabController;

const mongoose = require("mongoose");
require("../models/Diary");
const Vocabook = require("../models/Vocabook");

const vocabController = {};

// 특정 다이어리의 단어 목록 가져오기
vocabController.getAllWords = async (req, res) => {
  try {
    const vocabList = await Vocabook.find({
      diaryId: req.params.diaryId,
      isDeleated: false,
    }).sort({ createdAt: -1 });
    res.json(vocabList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

vocabController.toggleStatus = async (req, res) => {
  try {
    const vocab = await Vocabook.findById(req.params.id);
    if (!vocab) return res.status(404).json({ message: "Not found" });

    vocab.status = vocab.status === "learning" ? "mastered" : "learning";
    await vocab.save();

    res.json(vocab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

vocabController.deleteWord = async (req, res) => {
  try {
    console.log("Delete called for id:", req.params.id);
    const vocab = await Vocabook.findByIdAndUpdate(
      req.params.id,
      { isDeleated: true }, // 실제 삭제 X
      { new: true }
    );
    if (!vocab) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = vocabController;

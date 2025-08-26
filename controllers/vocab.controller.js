const mongoose = require("mongoose");
require("../models/Diary");
const VocaBook = require("../models/Vocabook");

const vocabController = {};

vocabController.getAllWords = async (req, res) => {
  try {
    const vocabList = await VocaBook.find({
      user: req.userId,
      isDeleted: false,
    }).sort({ createdAt: -1 });
    return res.status(200).json({ status: "success", vocabList: vocabList });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

vocabController.toggleStatus = async (req, res) => {
  try {
    const vocab = await VocaBook.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!vocab) throw new Error("선택된 단어가 존재하지 않습니다.");

    vocab.status = vocab.status === "learning" ? "mastered" : "learning";
    await vocab.save();

    return res.status(200).json({ status: "success", vocab: vocab });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

vocabController.deleteWord = async (req, res) => {
  try {
    const vocab = await VocaBook.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { isDeleted: true },
      { new: true }
    );
    console.log("vocab:", vocab);
    if (!vocab) throw new Error("선택된 단어가 존재하지 않습니다.");

    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = vocabController;

const mongoose = require("mongoose");
require("../models/Diary");
const { generateVocabMeaning } = require("../services/chatGPT");
const VocaBook = require("../models/Vocabook");
const Vocabook = require("../models/Vocabook");

const vocabController = {};

vocabController.createWord = async (req, res) => {
  try {
    const { vocab } = req.body;
    const userId = req.user._id;
    if (!vocab) throw new Error("선택된 단어가 존재하지 않습니다.");

    const vocabObj = await generateVocabMeaning(vocab);
    const vocabMeaning = vocabObj.meaning;
    const vocabExample = vocabObj.example;

    const newVoca = new Vocabook({
      userId,
      word: vocab,
      meaning: vocabMeaning,
      example: vocabExample,
      status: "learning",
      isDeleted: false,
    });

    const savedVocab = await newVoca.save();
    return res.status(200).json({ status: "success", vocab: savedVocab });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

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
    if (!vocab) throw new Error("선택된 단어가 존재하지 않습니다.");

    return res.status(200).json({ status: "success", id: vocab._id });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = vocabController;

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
    res.json(vocabList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

vocabController.toggleStatus = async (req, res) => {
  try {
    const vocab = await VocaBook.findOne({
      _id: req.params.id,
      user: req.userId,
    });

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
    const vocab = await VocaBook.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { isDeleted: true },
      { new: true }
    );
    console.log("vocab:", vocab);
    if (!vocab) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = vocabController;

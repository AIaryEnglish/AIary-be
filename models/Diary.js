const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const correctionSchema = new Schema({
  originalSentence: { type: String, required: true },
  correctedSentence: { type: String, required: true },
  reason: { type: String, required: true },
  similarExpressions: [{ type: String }],
  extraExamples: [{ type: String }],
});

const diarySchema = new Schema(
  {
    userId: { type: mongoose.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    isPublic: { type: Boolean, default: true },
    corrections: [correctionSchema],
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Diary = mongoose.model("Diary", diarySchema);
module.exports = Diary;

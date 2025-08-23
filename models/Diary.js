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
    comment: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

// 공개 피드 최신순 무한 스크롤
diarySchema.index({ isPublic: 1, _id: -1 });

// 사용자별 특정 날짜 (하루 한 편 정책)
diarySchema.index({ userId: 1, date: 1 }, { unique: true });

const Diary = mongoose.model("Diary", diarySchema);
module.exports = Diary;

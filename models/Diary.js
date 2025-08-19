const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diarySchema = new Schema();

const Diary = mongoose.model("Diary", diarySchema);
module.exports = Diary;

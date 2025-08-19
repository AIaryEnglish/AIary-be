const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vocabookSchema = new Schema();

const Vocabook = mongoose.model("Vocabook", vocabookSchema);
module.exports = Vocabook;

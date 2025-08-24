const mongoose = require("mongoose");
require("../models/User");
const Diary = require("../models/Diary");
const { correctDiary, generateDiaryComment } = require("../services/chatGPT");
const isValidDiaryDate = require("../utils/isValidDiaryDate");

const PAGE_SIZE = 9; // 상의 후 변경

const diaryController = {};

diaryController.createDiary = async (req, res) => {
  const { userId, title, content, image, isPublic, date } = req.body || {};

  try {
    if(!isValidDiaryDate(date)) throw new Error("작성 가능한 날짜는 오늘 기준 -2일부터 오늘까지 입니다.")

    const sentences = content.split(/[\n.?!]+/).filter((s) => s.trim() !== "");

    const corrections = await Promise.all(
      sentences.map(async (sentence) => {
        const result = await correctDiary(sentence);
        return {
          originalSentence: sentence,
          correctedSentence: result?.correctedSentence || sentence,
          reason: result?.reason || "No corrections needed",
          similarExpressions: result?.similarExpressions || [],
          extraExamples: result?.extraExamples || [],
        };
      })
    );

    const commentObj = await generateDiaryComment(content);
    const commentText = commentObj.commentText;

    const diary = new Diary({
      userId,
      title,
      content,
      image,
      isPublic,
      date,
      corrections,
      comment: commentText
    });

    const savedDiary = await diary.save();
    return res.status(200).json({ status: "success", diary: savedDiary });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

// 전체 일기들 가져오기 (Read)
diaryController.getAllDiaries = async (req, res) => {
  try {
    const { lastId } = req.query;
    const filter = { isPublic: true };

    const raw = typeof lastId === "string" ? lastId.trim() : lastId;
    if (raw) {
      if (!mongoose.isValidObjectId(raw)) {
        return res
          .status(400)
          .json({ status: "fail", message: "Invalid lastId" });
      }
      filter._id = { $lt: mongoose.Types.ObjectId.createFromHexString(raw) };
    }

    const items = await Diary.find(filter)
      .select("title content createdAt userId") // 필요한 필드만 가져오기
      .sort({ _id: -1 })
      .limit(PAGE_SIZE + 1)
      .populate({ path: "userId", select: "name profile -_id" })
      .lean({ virtuals: true });

    const hasNextPage = items.length > PAGE_SIZE;
    const sliced = hasNextPage ? items.slice(0, PAGE_SIZE) : items;
    const nextLastId = hasNextPage
      ? String(sliced[sliced.length - 1]._id)
      : null;

    const diaries = sliced.map((d) => ({
      _id: d._id,
      title: d.title,
      content: d.content,
      createdAt: d.createdAt,
      author: {
        name: d.userId?.name ?? null,
        profile: d.userId?.profile ?? null,
      },
    }));

    res.status(200).json({
      status: "success",
      pageSize: PAGE_SIZE,
      isFirstPage: !raw,
      hasNextPage,
      nextLastId,
      count: diaries.length,
      diaries,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

module.exports = diaryController;

const mongoose = require("mongoose");
require("../models/User");
const Diary = require("../models/Diary");

const PAGE_SIZE = 9; // 상의 후 변경

const diaryController = {};

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

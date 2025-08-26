const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/User");
const Diary = require("../models/Diary");
const Vocabook = require("../models/Vocabook");

const MONGODB_URI = process.env.MONGODB_URI_PROD;

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ DB connected");

    // 기존 데이터 삭제
    await User.deleteMany({});
    await Diary.deleteMany({});
    await Vocabook.deleteMany({});
    console.log("기존 User/Diary/Vocab 데이터 삭제 완료");

    // 1. User 시드 데이터 생성 및 삽입
    const users = await User.insertMany([
      {
        email: "alice@example.com",
        password: "hashedpassword1", // 실제 운영에선 bcrypt로 해싱된 값 필요
        name: "Alice",
        profile: "/images/default.png",
      },
      {
        email: "bob@example.com",
        password: "hashedpassword2",
        name: "Bob",
        profile: "/images/default.png",
      },
    ]);
    console.log("User 시드 데이터 삽입 완료");
    console.log("User Id:", users[0]._id);
    const jwt = require("jsonwebtoken");

    // dev용 토큰 생성
    const token = jwt.sign({ id: users[0]._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    console.log("Dev Token:", token);
    const decoded = jwt.decode(token);
    console.log(decoded);

    // // 2. Diary 시드 데이터 생성
    // const diaries = [
    //   {
    //     userId: users[0]._id, // Alice
    //     title: "Alice's First Diary",
    //     content: "Today I started writing my English diary!",
    //     isPublic: true,
    //     date: new Date("2025-08-20"),
    //   },
    //   {
    //     userId: users[0]._id,
    //     title: "Alice's Second Diary",
    //     content: "Studied vocabulary for 2 hours.",
    //     isPublic: false,
    //     date: new Date("2025-08-21"),
    //   },
    //   {
    //     userId: users[1]._id, // Bob
    //     title: "Bob's Diary",
    //     content: "Went hiking and wrote about it in English.",
    //     isPublic: true,
    //     date: new Date("2025-08-22"),
    //   },
    //   {
    //     userId: users[0]._id,
    //     title: "Alice – Morning Routine",
    //     content: "I practiced English speaking for 20 minutes this morning.",
    //     isPublic: true,
    //     date: new Date("2025-08-23"),
    //   },
    //   {
    //     userId: users[1]._id,
    //     title: "Bob – Coffee Chat",
    //     content: "Chatted with a friend about travel plans in English.",
    //     isPublic: true,
    //     date: new Date("2025-08-24"),
    //   },
    //   {
    //     userId: users[0]._id,
    //     title: "Alice – Reading Time",
    //     content: "Read an English article about technology.",
    //     isPublic: true,
    //     date: new Date("2025-08-25"),
    //   },
    //   {
    //     userId: users[1]._id,
    //     title: "Bob – Gym Notes",
    //     content: "Described my workout routine in English.",
    //     isPublic: true,
    //     date: new Date("2025-08-26"),
    //   },
    //   {
    //     userId: users[0]._id,
    //     title: "Alice – Movie Review",
    //     content: "Wrote a short review of an English movie.",
    //     isPublic: true,
    //     date: new Date("2025-08-27"),
    //   },

    //   {
    //     userId: users[1]._id,
    //     title: "Bob – Private Thoughts",
    //     content: "Reflected on my study progress.",
    //     isPublic: false,
    //     date: new Date("2025-08-28"),
    //   },
    //   {
    //     userId: users[0]._id,
    //     title: "Alice – Vocabulary List",
    //     content: "Compiled new words learned today.",
    //     isPublic: false,
    //     date: new Date("2025-08-29"),
    //   },
    //   {
    //     userId: users[1]._id,
    //     title: "Bob – Late Night Study",
    //     content: "Practiced grammar quietly at night.",
    //     isPublic: false,
    //     date: new Date("2025-08-30"),
    //   },
    // ];

    // await Diary.insertMany(diaries);
    // console.log("Diary 시드 데이터 삽입 완료");

    // 3. 단어장 시드 데이터 생성
    await Vocabook.insertMany([
      {
        userId: users[0]._id,
        word: "green",
        meaning: "having the colour of grass",
        example: "Wait for the light to turn green.",
        status: "mastered",
        isDeleted: false,
      },
      {
        userId: users[0]._id,
        word: "study",
        meaning: "to learn about a subject",
        example: "She studies English every morning.",
        status: "learning",
        isDeleted: false,
      },
      {
        userId: users[0]._id,
        word: "create",
        meaning: "to make something new",
        example: "He wants to create a new mobile app.",
        status: "learning",
        isDeleted: false,
      },
      {
        userId: users[0]._id,
        word: "improve",
        meaning: "to make something better",
        example: "She practices every day to improve her skills.",
        status: "learning",
        isDeleted: false,
      },
      {
        userId: users[0]._id,
        word: "discover",
        meaning: "to find something for the first time",
        example: "They discovered a new restaurant in town.",
        status: "learning",
        isDeleted: false,
      },
      {
        userId: users[0]._id,
        word: "share",
        meaning: "to give part of something to others",
        example: "He likes to share his lunch with his friends.",
        status: "learning",
        isDeleted: false,
      },
    ]);
    console.log("Vocabook 시드 데이터 삽입 완료");
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("🔌 DB disconnected");
    process.exit();
  }
};

seed();

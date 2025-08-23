const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    console.log("Creating user with data:", req.body);
    let { email, password, name } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 존재하는 이메일입니다");
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password,
      name,
    });
    await newUser.save();
    return res.status(200).json({ status: "success", success: true });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = userController;

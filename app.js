const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;
const mongoURI = process.env.MONGODB_URI_PROD;
// 변경사항

app.use(cors());
app.use(bodyParser.json()); // req.body가 객체로 인식됨
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", indexRouter);

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log("DB connection fail", err));

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});

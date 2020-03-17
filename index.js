const CronJob = require("cron").CronJob;
const mongoose = require("mongoose");
const axios = require("axios");
const Schema = mongoose.Schema;
const db = "mongodb://127.0.0.1:27017";

// 连接mongodb数据库
mongoose.set("useFindAndModify", false);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: "cjw",
    pass: "cjw",
    dbName: "ylink"
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log(err));

const Daily = mongoose.model(
  "daily",
  new Schema({
    sid: String,
    tts: String,
    content: String,
    note: String,
    love: String,
    picture: String,
    picture2: String,
    dateline: String,
    fenxiang_img: String,
    picture3: String,
    picture4: String
  })
);

const job = new CronJob("*/10 * * * * *", () => {
  axios
    .get("http://open.iciba.com/dsapi")
    .then(res => {
      // console.log(res.data);
      const daily = new Daily(res.data);
      daily.save().then(user => console.log(user));
    })
    .catch(err => {
      console.log(err);
    });
});

job.start();

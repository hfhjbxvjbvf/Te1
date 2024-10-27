module.exports = (app) => {
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://127.0.0.1:27017/blog", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  }).then(() => {
    console.log('数据库连接成功');
  }).catch((error) => {
    console.error('数据库连接失败:', error);
  });
  require("require-all")(__dirname + "/../models");
};

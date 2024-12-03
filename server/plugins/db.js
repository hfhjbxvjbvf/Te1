module.exports = (app) => {
  const mongoose = require("mongoose");
  //const dbUri = "mongodb://localhost:27017/blog"; //本机运行数据库
  const dbUri = "mongodb://blog:PxLHHb7ZjrMrEJZP@localhost:27019/blog"; //服务器上的数据库

  mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => {
    console.log('数据库连接成功');
    require("require-all")(__dirname + "/../models"); // 在数据库连接成功后加载模型
  }).catch((error) => {
    console.error('数据库连接失败:', error);
  });
};
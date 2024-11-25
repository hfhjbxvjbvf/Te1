const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Article = mongoose.model("Article");

// 获取指定分类的文章
router.get('/', async (req, res) => {
  const { category = "CPU", page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  try {
    // 使用查询条件根据分类筛选文章
    const articles = await Article.find({ categories: category })
                                  .skip(skip)
                                  .limit(Number(limit));

    res.send(articles);
  } catch (error) {
    res.status(500).send({ message: '服务器错误', error });
  }
});

module.exports = router;

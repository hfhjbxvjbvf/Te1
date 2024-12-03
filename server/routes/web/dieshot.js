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
    const dieshots = await Article.find({ categories: category })
                                  .skip(skip)
                                  .limit(Number(limit));

    res.send(dieshots);
  } catch (error) {
    res.status(500).send({ message: '服务器错误', error });
  }
});

//获取指定id的dieshot
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dieshot = await Article.findById(id);
    res.send(dieshot);
  } catch (error) {
    res.status(500).send({ message: '服务器错误', error });
  }
});

module.exports = router;

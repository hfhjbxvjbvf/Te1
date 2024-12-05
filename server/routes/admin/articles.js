const express = require('express')
const router = express.Router()
const articles = require('../../models/Article')

router.post('/', async (req, res) => {
    const model = await articles.create(req.body)
    res.send(model)
  })
  router.put('/:id', async (req, res) => {
    const model = await articles.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.delete('/:id', async (req, res) => {
    await articles.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true,
    })
  })
  router.get('/', async (req, res) => {
    const { category=["CPU","Intel"], page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    // console.log("筛选条件",category);
    try {
      // 使用查询条件根据分类筛选dieshot
      const dieshots = await articles.find({ categories: {$all: category} })
                                    .skip(skip)
                                    .limit(Number(limit));
  
      res.send(dieshots);
    } catch (error) {
      console.error("查询发生错误:", error);
      res.status(500).send({ message: '服务器错误', error });
    }
  });
  router.get('/:id', async (req, res) => {
    const model = await articles.findById(req.params.id)
    res.send(model)
  })
  module.exports = router
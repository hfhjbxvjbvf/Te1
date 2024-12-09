const express = require('express')
const router = express.Router()
const News = require('../../models/News')

//获取新闻
router.get('/', async (req, res) => {
  const items = await News.find().sort({_id: -1})
  res.send(items)
})

router.get('/:id', async (req, res) => {
  const item = await News.findById(req.params.id)
  res.send(item)
})

//上传新闻
router.post('/', async (req, res) => {
  const model = await News.create(req.body)
  res.send(model)
})
//修改新闻
router.put('/:id', async (req, res) => {
  const model = await News.findByIdAndUpdate(req.params.id, req.body)
  res.send(model)
})

//
router.delete('/:id', async (req, res) => {
  await News.findByIdAndDelete(req.params.id, req.body)
  res.send({
    success: true
  })
})

module.exports = router


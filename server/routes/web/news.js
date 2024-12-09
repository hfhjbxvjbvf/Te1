const express =  require('express')
const router = express.Router()
const mongoose = require('mongoose')
const News = mongoose.model('News')

// 获取新闻列表
router.get('/', async (req, res) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 10
  const skip = (page - 1) * limit
  const total = await News.countDocuments()
  const newsList = await News.find().skip(skip).limit(limit)
  res.send({
    newsList,
    total
  })
})

// 新闻详情
router.get('/:id', async (req, res) => {
  const news = await News.findById(req.params.id)
  if(!news){
    return res.status(400).send({
      message: '新闻不存在'
    })
  }else{
    return res.status(200).send(news)
  }
  
})

module.exports = router
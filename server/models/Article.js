const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  categories: [{
    type: String,
  }],
  title: {
    type: String
  },
  picture: {
    picture_360p:{
      type: String
    },
    picture_4K:{
      type: String
    }
  },
  body: {
    type: String
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', schema)
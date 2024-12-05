const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  categories: [{
    type: String,
  }],
  title: {
    type: String
  },
  icon: {
    type: String
  },
  body: {
    type: String
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', schema)
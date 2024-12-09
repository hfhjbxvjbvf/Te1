const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    title: { type: String },
    lead: { type: String },
    picture: { type: String },
    author: { type: String },
    text: { type: String },
    date: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('News', schema)

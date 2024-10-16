// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // 必填字段
    trim: true, // 去除首尾空格
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // 价格必须为正数
  },
  imageUrl: {
    type: String,
    required: true, // 图片URL
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category', // 关联到分类模型
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product', // 用于实现父子关系
  },
  createdAt: {
    type: Date,
    default: Date.now, // 默认当前时间
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// 每次保存之前，更新 `updatedAt`
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

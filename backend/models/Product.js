const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'general'
  },
  rating: {
    rate: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

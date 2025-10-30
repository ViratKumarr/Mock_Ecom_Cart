const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  userId: {
    type: String,
    default: 'mockUser123',
    required: true
  }
}, {
  timestamps: true
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;

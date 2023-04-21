const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  UNITS,
  SUBCATEGORY,
  CATEGORY,
} = require('./constants/product.constant');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  trademark: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    enum: CATEGORY,
    required: true,
  },
  subCategory: {
    type: String,
    enum: SUBCATEGORY,
    required: true,
  },
  price: {
    type: Number,
  },
  unit: {
    type: String,
    enum: UNITS,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Product', productSchema);

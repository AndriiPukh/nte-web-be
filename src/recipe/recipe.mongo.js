const mongoose = require('mongoose');
const { UNITS } = require('../product/constants/product.constant');

const { Schema } = mongoose;

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
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
  ingredients: [
    {
      title: { type: String, required: true },
      amount: { type: Number, required: true },
      unit: { type: String, enum: UNITS, required: true },
      products: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
          },
          recommendations: [
            {
              userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
              },
            },
            {
              recommend: {
                type: Boolean,
                required: true,
              },
            },
          ],
        },
      ],
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

module.exports = mongoose.model('Recipe', recipeSchema);

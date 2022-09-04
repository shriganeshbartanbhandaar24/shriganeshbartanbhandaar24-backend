import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    ratings: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
)

const ProducSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    reviews: {},
    rating: {
      type: String,
      default: 0,
      required: true,
    },
    numReviews: {
      type: String,
      default: 0,
      required: true,
    },
    price: {
      type: String,
      default: 0,
      required: true,
    },
    countInStock: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
const Product = mongoose.model('Product', ProducSchema)
export default Product

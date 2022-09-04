import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import ProductModels from '../models/ProductModel.js'

const getAllProducts = asyncHandler(async (req, res) => {
  console.log('Called 1')
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const products = await ProductModels.find({})

  return res.status(200).json(products)
})

const showProductDetails = asyncHandler(async (req, res) => {
  console.log('Called 2')
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { _id } = req.params

  // console.log(req.params)
  // console.log(req.body)

  const product = await ProductModels.find({ _id })

  if (product) {
    return res.status(200).json(product)
  } else {
    return res.status(402).json({ message: 'No Product Found' })
  }
})

export { getAllProducts, showProductDetails }

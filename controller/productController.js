import asyncHandler from "express-async-handler"
import { validationResult } from "express-validator"
import { uploadFile } from "../config/s3.js"
import Product from "../models/ProductModel.js"
import ProductModels from "../models/ProductModel.js"

const getAllProducts = asyncHandler(async (req, res) => {
  console.log("Called 1")
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const products = await ProductModels.find({})

  return res.status(200).json(products)
})

const showProductDetails = asyncHandler(async (req, res) => {
  console.log("Called 2")
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
    return res.status(402).json({ message: "No Product Found" })
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: "Product Removed" })
  } else {
    returnres.status(402).json({ message: "No Product Found" })
  }
})

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, quantity, units } = req.body

  const file = req.file
  if (!file) {
    return res.status(400).json({
      message: "Image Field Required",
    })
  }
  const { Location: image } = await uploadFile(file)
  const product = await Product.create({
    name,
    description,
    price,
    unit,
    image,
    quantity,
  })

  await Product.save()
  return res.status(201).json({ product })
})

export { getAllProducts, showProductDetails, addProduct }

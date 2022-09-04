import asyncHandler from "express-async-handler"
import Order from "../models/OrderModel.js"

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shipping,
    paymentMethod,
    itemPrice,
    tax,
    totalPrice,
    shippingPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "No Order Items Exist" })
  }

  const order = new Order({
    orderItems,
    user: "628729a95dea52fe9d700e98",
    shippingAddress: shipping,
    paymentMethod,
    itemPrice,
    tax,
    totalPrice,
  })

  const createdOrder = await order.save()
  console.log(createdOrder)

  res.status(201).json({ createdOrder })
})

const getOrderDetails = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )

  if (order) {
    return res.json(order)
  } else {
    res.status(404).json({ message: "Order not found" })
  }
})

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  console.log("orders", orders)
  res.json(orders)
})
export { addOrderItems, getOrderDetails, getMyOrders }

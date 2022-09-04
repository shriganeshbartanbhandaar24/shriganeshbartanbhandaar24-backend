import asyncHandler from "express-async-handler"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"

const userLogin = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  //console.log(1)

  if (!errors.isEmpty()) {
    // console.log(errors.array())
    // console.log(2)
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  const user = await User.findOne({ email: email })
  // console.log("userr", user)
  // console.log(password)

  if (user && (await user.authenticate(password))) {
    // console.log(3)
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET,
      { expiresIn: "30d" }
    )

    return res.json({
      user: await User.findById(user._id).select("-password"),
      token,
    })
  }
  // console.log(4)

  return res.status(400).json({
    message: "Invalid email or password",
  })
})

const userSignUp = asyncHandler(async (req, res) => {
  // console.log("H22l2o91 2")

  const errors = validationResult(req)
  // console.log("Hello 1")

  // console.log(errors.array())

  if (!errors.isEmpty()) {
    res.status(400)
    return res.json({ errors: errors.array() })
  }

  const { firstName, lastName, email, password } = req.body
  // console.log("Hello 2")
  const existUser = await User.findOne({ email: email })

  if (existUser) {
    // console.log("Hello 3")
    res.status(301)
    return res.json({
      message: `User with email ${email} is already exists`,
    })
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  })
  // console.log("Hello 4")
  res.status(201)
  return res.json({
    user: await User.findById(user._id).select("-password"),
  })
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: "User Removed" })
  } else {
    res.status(404).json({ message: "User Not Found" })
  }

  res.json(users)
})

export { userLogin, userSignUp, getUsers, deleteUser }

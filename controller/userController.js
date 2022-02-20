import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const userLogin = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.authenticate(password))) {
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET,
      { expiresIn: "30d" }
    );

    return res.json({
      user: await User.findById(user._id).select("-password"),
      token,
    });
  }

  return res.status(400).json({
    message: "Invalid email or password",
  });
});

const userSignUp = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    return res.json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  const existUser = await User.findOne({ email: email });

  if (existUser) {
    res.status(400);
    return res.json({
      message: `User with email ${email} is already exists`,
    });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  res.status(201);
  return res.json({
    user: await User.findById(user._id).select("-password"),
  });
});

export { userLogin, userSignUp };

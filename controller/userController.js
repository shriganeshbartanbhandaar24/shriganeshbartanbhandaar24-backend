import asyncHandle from "express-async-handler";
import { validationResult } from "express-validator";
import User from "../models/UserModel.js";

const userLogin = asyncHandle(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = User.findOne({ email: email });

  if (user && (await user.authenticate(password))) {
    console.log("slb");
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

const userSignUp = asyncHandle(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array });
  }

  const { firstName, lastName, email, password } = req.body;

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    console.log("errors___1");
    return res.status(400).json({ message: `User:${email} Already Exist` });
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  if (user) {
    return res
      .status(200)
      .json({ user: await User.findById(user._id).select("-password") });
  } else {
    return res.status(401).json({ mesage: "Something Went  Worng!!!" });
  }
});

export { userLogin, userSignUp };

import asyncHandle from "express-async-handler";
import { ValidationError } from "express-validation";

const userLogin = asyncHandle(async (req, res) => {
  const errors = ValidationError(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

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

export { userLogin };

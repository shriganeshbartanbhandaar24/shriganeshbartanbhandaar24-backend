import jwt from "jsonwebtoken"

const authenticate = (req, res, next) => {
  var token = req.headers.authorization
  console.log("token", token, req.headers)

  //validating bearer token

  if (!token || !token.startsWith("Bearer")) {
    return res
      .status(403)
      .json({ message: "A Token is required for authentication" })
  }

  token = token.split(" ")[1]
  try {
    //decoding jwt token
    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = decoded
    return next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" })
  }
}

const allowAdminOnly = (req, res, next) => {
  const user = req.user
  if (user && user.isAdmin) {
    return next()
  }
  return res.status(401).json({ message: "You are not authorize to access" })
}

export { authenticate, allowAdminOnly }

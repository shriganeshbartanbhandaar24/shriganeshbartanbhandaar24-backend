import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import colors from "colors"

import connectToDatabase from "./config/database.js"

import userRoutes from "./routes/userRoutes.js"
import coreRoutes from "./routes/coreRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import errorHandler from "./middleware/errorMiddleware.js"
import notFoundMiddleware from "./middleware/notFoundMiddleWare.js"

import productRoutes from "./routes/productRoutes.js"

//initialization
const app = express()
dotenv.config()

//database connnection
try {
  await connectToDatabase()
} catch (err) {
  console.err(err.red.bold)
  process.exit(1)
}

//check environment
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"))
}

//encoding
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//constants
const NODE_ENV = process.env.NODE_ENV
const HOST = process.env.HOST
const PORT = process.env.PORT || 5000

//routes
app.use("/api", coreRoutes)
app.use("/api/users", userRoutes)
// app.use("/api/users", (req, res) => {
//   console.log("Hey")
//   console.log(req.body)
// })
// app.use("/api/order/myorders", (req, res) => {
//   //console.log(req.headers)
//   console.log(req.body)
//   console.log(req.params)
// })
app.use("/api/products", productRoutes)
app.use("/api/order", orderRoutes)

app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

//Not Found
app.route(notFoundMiddleware)

// //Middlewares
app.route(errorHandler)

// listen
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error:${err}`)
  }
  console.log(
    `Server is running in ${NODE_ENV} mode on ${HOST}:${PORT}`.blue.bold
  )
})

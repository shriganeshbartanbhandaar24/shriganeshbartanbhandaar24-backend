import express from "express"
import {
  addOrderItems,
  getMyOrders,
  getOrderDetails,
} from "../controller/orderController.js"
import { authenticate } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/", addOrderItems)
router.route("/myorders").get(authenticate, getMyOrders)
router.route("/:id").get(getOrderDetails)

export default router
